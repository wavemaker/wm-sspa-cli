/* ####### STEPS ########
 * Deploy Application | Manual
 * Copy updated Angular.json
 * npm install
 * Ng Build
 * Copy Style & Script Files to Bundle Folder
 * Update Routes & App Module
 * Update Markups referring LazyLoad
 * Add Single-spa schematics
 * Remove Sspa Empty Component
 * Run SSPA Prod Build
 * Copy Main to Bundle Folder
 */
const fs = require("fs");
const project_path = () => process.env.PROJECT_PATH || "";
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ncp = util.promisify(require("ncp").ncp);
const rimraf = require("rimraf");

const CLI = require("clui");
const Spinner = CLI.Spinner;
const chalk = require("chalk");
// ['◜','◠','◝','◞','◡','◟'];
const countdown = new Spinner("Initiating...  ", [
  "⣾",
  "⣽",
  "⣻",
  "⢿",
  "⡿",
  "⣟",
  "⣯",
  "⣷"
]);

const wmReplJs = require("./wm_replace_angular");
const wmPrepApp = require("./wm_prepare_app");

const getGeneratedApp = path => `${path}/generated-angular-app`;
const getBundlePath = path => `${path}/wm-sspa`;

const showResult = ({ stdout, stderr }) => {
  return;
  stdout && console.log(chalk.grey(stdout));
  stderr && console.error(chalk.red(stderr));
};
const backUpGenNgApp = async path => {
  const backupPath = `${path}/wm-ng-app`;
  const sourcePath = getGeneratedApp(path);
  fs.existsSync(backupPath) && rimraf.sync(backupPath);
  fs.mkdirSync(backupPath);
  await ncp(sourcePath, backupPath);
};
const restoreBackup = path => {
  const backupPath = `${path}/wm-ng-app`;
  const cleanupPath = `${getGeneratedApp(path)}`;
  rimraf.sync(cleanupPath);
  fs.renameSync(backupPath, cleanupPath);
};
const createBundleFolder = path => {
  const bundlePath = getBundlePath(path);
  rimraf.sync(bundlePath);
  fs.mkdirSync(bundlePath);
};
const copyFileToBundle = async (path, fileName) => {
  const bundlePath = `${getGeneratedApp(path)}/dist/ng-bundle`;
  const destPath = getBundlePath(path);
  const srcFile = `/${
    fs.readdirSync(bundlePath).filter(file => file.startsWith(fileName))[0]
  }`;
  await ncp(bundlePath + srcFile, destPath + srcFile);
};

const buildNgApp = path =>
  `cd ${getGeneratedApp(path)} && npm i && ng b --prod`;
const copyScripts = async path => await copyFileToBundle(path, "scripts");
const copyStyles = async path => await copyFileToBundle(path, "styles");
const copyMain = async path => await copyFileToBundle(path, "main");
const addSspa = path =>
  `cd ${getGeneratedApp(path)} && ng add single-spa-angular`;
const buildSspaApp = path =>
  `cd ${getGeneratedApp(path)} && npm run build:single-spa`;
const delSspaEmptyComp = path => {
  const compPath = `${getGeneratedApp(path)}/src/app/empty-route`;
  rimraf.sync(compPath);
};

const printResult = path => {
  console.log(
    chalk.green(`wm-sspa-cli:Generated Single-Spa artifacts successfully!`),
    chalk.whiteBright(
      `\nArtifacts are generated at: `
    ),
    chalk.bgWhiteBright.black(` ${getBundlePath(path)} \n\n`)
  );
};

module.exports = {
  generateSspaBundle: async (projectPath, deployUrl, verbose) => {
    try {
      let res;
      countdown.start();
      countdown.message(`Preparing Backup               `);
      await backUpGenNgApp(projectPath);
      countdown.message(`Preparing Bundle Folder        `);
      createBundleFolder(projectPath);
      countdown.message(`Setup Angular Build            `);
      await wmReplJs.replaceAngularJson(projectPath);
      countdown.message(`Building the Project           `);
      res = await exec(buildNgApp(projectPath));
      verbose && showResult(res);
      countdown.message(`Copying Styles                 `);
      await copyStyles(projectPath);
      countdown.message(`Copying Scripts                `);
      await copyScripts(projectPath);

      countdown.message(`Updating WaveMaker App         `);
      await wmPrepApp.prepareApp(projectPath, deployUrl);

      countdown.message(`Adding Single-spa schematics   `);
      res = await exec(addSspa(projectPath));
      verbose && showResult(res);
      delSspaEmptyComp(projectPath);

      countdown.message(`Building for Single-Spa       `);
      res = await exec(buildSspaApp(projectPath));
      verbose && showResult(res);

      countdown.message(`Copying Final Files          `);
      await copyMain(projectPath);
      countdown.message(`Resetting the Project        `);
      restoreBackup(projectPath);
      countdown.stop();

      printResult(projectPath);
    } catch (e) {
      console.log(chalk.red(` EXCEPTION | ${e}`));
    }
  }
};
