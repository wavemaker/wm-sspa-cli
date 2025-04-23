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
const ncp = util.promisify(require("ncp").ncp);
const rimraf = require("rimraf");
const { updateStatus, printSuccess } = require("./wm_cli_util");

const { replaceAngularJson, updatePackageJson,updateTsConfigAppJson, updateWebpackConfig } = require("./wm_json_utils");
const { prepareApp, updateApp } = require("./wm_prepare_app");

const { getGeneratedApp, getBundlePath, getSspaPath, execCommand} = require("./wm_utils");
const { getProjVersion, generateNgCode } = require("./wm_codegen_utils");
// TODO: Verbose support | --verbose option
const showResult = ({ stdout, stderr }) => {
  return;
  // stdout && console.log(chalk.grey(stdout));
  // stderr && console.error(chalk.red(stderr));
};

const setupSspaProj = async path => {
  await generateNgCode(path);
  const sourcePath = getGeneratedApp(path);
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

const goToPath = path => `cd ${getSspaPath(path)}`;
const installDependencies = path => `cd ${getSspaPath(path)} && npm i && npm i acorn@8.14.0 --save-dev`;
const buildNgApp = path => `cd ${getSspaPath(path)} && npm run build:sspa`;
const copyScripts = async path => await copyFileToBundle(path, "scripts");
const copyStyles = async path => await copyFileToBundle(path, "styles");
const copyMain = async path => await copyFileToBundle(path, "main");
const addSspa = path => `cd ${getSspaPath(path)} && npm run add-single-spa`;
const buildSspaApp = (path, isHashingEnabled) => isHashingEnabled === 'true' ? `cd ${getSspaPath(path)} && npm run build:sspa  && npm run postbuild:sspa` : `cd ${getSspaPath(path)} && npm run build:sspa`;
const delSspaEmptyComp = path => {
  const compPath = node_path.resolve(`${getSspaPath(path)}/src/app/empty-route`);
  rimraf.sync(compPath);
};
const installDeps = async projectPath => {
    let chgPathCmd = goToPath(projectPath);
    await execCommand(chgPathCmd).catch((err) => { console.error(`Something went wrong while running command ${chgPathCmd}`, err) });

    const file = node_path.resolve(`${getSspaPath(projectPath)}/package-lock.json`);
    rimraf.sync(file);
    let installCmd = installDependencies(projectPath);
    await execCommand(installCmd).catch((err) => { console.error(`Something went wrong while running command ${installCmd}`, err) });
}
const invokeMaven = async (projectPath) => {
    updateStatus(`Invoking Maven               `);
    let isPublicApp = getProjVersion(projectPath).indexOf("next") === -1;
    let mvnCommand = isPublicApp ? `mvn clean process-classes` : `mvn clean process-classes -Pwavemaker-internal`;
    let mvnCmd = `cd ${projectPath} && ${mvnCommand}`;
    await execCommand(mvnCmd).catch((err) => { console.error(`Something went wrong while running command ${mvnCmd}`, err) });
};

const generateSspaBundle = async (projectPath, deployUrl, sspaDeployUrl, libraryTarget, splitStyles, isHashingEnabled, mountStyles, verbose) => {

  updateStatus(`Preparing project               `);
  await setupSspaProj(projectPath);

  updateStatus(`Preparing Bundle Folder        `);
  createBundleFolder(projectPath);

  updateStatus(`Updating WaveMaker App         `);
  await prepareApp(projectPath, deployUrl);
  updatePackageJson(projectPath, isHashingEnabled, sspaDeployUrl);

  updateStatus(`Installing Dependencies   `);
  await installDeps(projectPath)

  updateStatus(`Adding Single-spa schematics   `);
  let sspaCmd = addSspa(projectPath);
  await execCommand(sspaCmd).catch((err) => { console.error(`Something went wrong while running command ${sspaCmd}`, err) });

  replaceAngularJson(projectPath, splitStyles, libraryTarget);
  updateTsConfigAppJson(projectPath);
  await updateApp(projectPath, deployUrl, sspaDeployUrl, libraryTarget, splitStyles, mountStyles, isHashingEnabled);

  updateStatus(`Installing Single-SPA Dependencies   `);
  let insCmd = installDependencies(projectPath);
  await execCommand(insCmd).catch((err) => { console.error(`Something went wrong while running command ${insCmd}`, err) });

  updateStatus(`Building for Single-Spa               `);
  let buildSSpaCmd = buildSspaApp(projectPath, isHashingEnabled);
  await execCommand(buildSSpaCmd).catch((err) => { console.error(`Something went wrong while running command ${buildSSpaCmd}`, err) });

  updateStatus(`Copying Final Files          `);
  await copyDistFolder(projectPath)

  printSuccess(`Artifacts are generated at: ${getBundlePath(projectPath)}`);
};
module.exports = {
  invokeMaven,
  generateSspaBundle
};
