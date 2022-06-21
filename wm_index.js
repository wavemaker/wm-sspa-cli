/*
 * # WM-SSPA-CLI #
 * download zip as per proj version //TODO
 * generate angular code //TODO
 * Update Angular.json
 * npm install
 * Ng Build & Generate Style & Script
 * Copy Style & Script Files to Bundle Folder
 * Update Routes & App Module
 * Update Markups referring LazyLoad
 * Add Single-spa schematics
 * Remove Sspa Empty Component
 * Run SSPA Prod Build
 * Copy Main to Bundle Folder
 */
/* TODO:
 * Do not gen NgBuild, if the deployment is Angular has it already
 * Add Ng Schematics
 */
const fs = require("fs");
const node_path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ncp = util.promisify(require("ncp").ncp);
const rimraf = require("rimraf");
const { updateStatus, printSuccess } = require("./wm_cli_util");

const { replaceAngularJson, updatePackageJson,updateTsConfigAppJson, updateWebpackConfig } = require("./wm_json_utils");
const { prepareApp, updateApp } = require("./wm_prepare_app");

const { getGeneratedApp, getBundlePath, getSspaPath } = require("./wm_utils");
const { generateNgCode } = require("./wm_codegen_utils");
// TODO: Verbose support | --verbose option
const showResult = ({ stdout, stderr }) => {
  return;
  // stdout && console.log(chalk.grey(stdout));
  // stderr && console.error(chalk.red(stderr));
};

const remPkglockFile = path => {
  rimraf.sync(node_path.resolve(path,'package-lock.json'));
}
const setupSspaProj = async path => {
  await generateNgCode(path);
  // const backupPath = getSspaPath(path);
  const sourcePath = getGeneratedApp(path);
  updateStatus(`Preparing project               `);
  // fs.existsSync(backupPath) && rimraf.sync(backupPath);
  // fs.mkdirSync(backupPath);
  // await ncp(sourcePath, backupPath);
  // remPkglockFile(backupPath);

  // remPkglockFile(sourcePath);
};

const cleanSspaProj = path => {
  const backupPath = getSspaPath(path);
  rimraf.sync(backupPath);
};

const createBundleFolder = path => {
  const bundlePath = getBundlePath(path);
  rimraf.sync(bundlePath);
  fs.mkdirSync(bundlePath);
};

const copyDistFolder = async (path) => {
    const bundlePath = node_path.resolve(`${getSspaPath(path)}/dist/ng-bundle`);
    const destPath = getBundlePath(path);
    await ncp(bundlePath, destPath);
}

const copyFileToBundle = async (path, fileName) => {
  const bundlePath = node_path.resolve(`${getSspaPath(path)}/dist/ng-bundle`);
  const destPath = getBundlePath(path);
  const srcFile = fs.readdirSync(bundlePath).filter(file => file.startsWith(fileName))[0]
  await ncp(node_path.resolve(bundlePath,srcFile), node_path.resolve(destPath,srcFile));
};

const updateMainJsResourcesPath = async(path, deployUrl) => {
  const destPath = getGeneratedApp(path) + "/dist/ng-bundle";
    fs.readdirSync(destPath).filter(function(file) {
        if (node_path.extname(file).toLowerCase() === ".js") {
            let jsFileData = fs.readFileSync(destPath + '/' + file, {encoding: 'utf8'});
            jsFileData = jsFileData.replace(new RegExp('^resources/i18n', 'g'), deployUrl + '/resources/i18n');
            jsFileData = jsFileData.replace(new RegExp('"\.\/resources\/images', 'g'), '"' + deployUrl + '/resources/images');
            jsFileData = jsFileData.replace(new RegExp('"resources\/images', 'g'), '"' + deployUrl + '/resources/images');
            jsFileData = jsFileData.replace(new RegExp('.ngDest="ng-bundle/"', 'g'), '.ngDest="' + deployUrl + '/ng-bundle/"');
            // jsFileData = jsFileData.replace(new RegExp('"\.\/app\/prefabs\/'), 'g', '"' + deployUrl + '/app/prefabs/');
            // jsFileData = jsFileData.replace(new RegExp('"\/app\/prefabs\/', 'g'), '"' + deployUrl + '/app/prefabs/');
            fs.writeFileSync(destPath + '/' + file, jsFileData);
        }
    });
};

const installDeps = path => `cd ${getSspaPath(path)} && npm i`;
const buildNgApp = path => `cd ${getSspaPath(path)} && npm run build-prod`;
const copyScripts = async path => await copyFileToBundle(path, "scripts");
const copyStyles = async path => await copyFileToBundle(path, "styles");
const copyMain = async path => await copyFileToBundle(path, "main-es2015");
const addSspa = path => `cd ${getSspaPath(path)} && npm run add-single-spa`;
const buildSspaApp = path =>
  `cd ${getSspaPath(path)} && npm run build-prod`;
  // `cd ${getSspaPath(path)} && npm run build:single-spa:angular-app`;
const delSspaEmptyComp = path => {
  const compPath = node_path.resolve(`${getSspaPath(path)}/src/app/empty-route`);
  rimraf.sync(compPath);
};

const generateSspaBundle = async (projectPath, deployUrl, sspaDeployUrl, libraryTarget, splitStyles, mountStyles, verbose) => {
  
  updateStatus(`Preparing project               `);
  await setupSspaProj(projectPath);

  updateStatus(`Preparing Bundle Folder        `);
  createBundleFolder(projectPath);

  updateStatus(`Setup Angular Build            `);
  updatePackageJson(projectPath, sspaDeployUrl);
  replaceAngularJson(projectPath, splitStyles);
  updateStatus(`Installing Dependencies           `);
  await exec(installDeps(projectPath));

  // updateStatus(`Building the Project           `);
  // await exec(buildNgApp(projectPath));

  // verbose && showResult(res);
  // updateStatus(`Copying Styles                 `);
  // await copyStyles(projectPath);

  // updateStatus(`Copying Scripts                `);
  // await copyScripts(projectPath);
    
  updateStatus(`Updating WaveMaker App         `);
  await prepareApp(projectPath, deployUrl);

  updateStatus(`Adding Single-spa schematics   `);
  await exec(addSspa(projectPath));
  updateApp(projectPath, deployUrl, sspaDeployUrl, libraryTarget, splitStyles, mountStyles);
  // delSspaEmptyComp(projectPath);
  // verbose && showResult(res);

  updateStatus(`Installing Single-SPA Dependencies   `);
  await exec(installDeps(projectPath));
  updateTsConfigAppJson(projectPath);
  // updateWebpackConfig(projectPath);

  updateStatus(`Building for Single-Spa               `);
  await exec(buildSspaApp(projectPath));
  // verbose && showResult(res);

  updateStatus(`Update resources path          `);
  await updateMainJsResourcesPath(projectPath, deployUrl);

  updateStatus(`Copying Final Files          `);
  // await copyMain(projectPath);
  await copyDistFolder(projectPath)

  // updateStatus(`Resetting the Project        `);
  // !process.env.KEEP_SSPA_PROJ && cleanSspaProj(projectPath);

  printSuccess(`Artifacts are generated at: ${getBundlePath(projectPath)}`);
};
module.exports = {
  generateSspaBundle
};
