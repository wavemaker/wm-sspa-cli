/*
 * # WM-SSPA-CLI #
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
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ncp = util.promisify(require("ncp").ncp);
const rimraf = require("rimraf");
const { updateStatus, printSuccess } = require("./wm_cli_util");

const { replaceAngularJson } = require("./wm_replace_angular");
const { prepareApp } = require("./wm_prepare_app");

const { getGeneratedApp, getBundlePath, getSspaPath } = require("./wm_utils");
// TODO: Verbose support | --verbose option
const showResult = ({ stdout, stderr }) => {
  return;
  // stdout && console.log(chalk.grey(stdout));
  // stderr && console.error(chalk.red(stderr));
};

const setupSspaProj = async path => {
  const backupPath = getSspaPath(path);
  const sourcePath = getGeneratedApp(path);
  fs.existsSync(backupPath) && rimraf.sync(backupPath);
  fs.mkdirSync(backupPath);
  await ncp(sourcePath, backupPath);
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

const copyFileToBundle = async (path, fileName) => {
  const bundlePath = `${getSspaPath(path)}/dist/ng-bundle`;
  const destPath = getBundlePath(path);
  const srcFile = `/${
    fs.readdirSync(bundlePath).filter(file => file.startsWith(fileName))[0]
  }`;
  await ncp(bundlePath + srcFile, destPath + srcFile);
};

const buildNgApp = path => `cd ${getSspaPath(path)} && npm i && ng b --prod`;
const copyScripts = async path => await copyFileToBundle(path, "scripts");
const copyStyles = async path => await copyFileToBundle(path, "styles");
const copyMain = async path => await copyFileToBundle(path, "main");
const addSspa = path => `cd ${getSspaPath(path)} && ng add single-spa-angular`;
const buildSspaApp = path =>
  `cd ${getSspaPath(path)} && npm run build:single-spa`;
const delSspaEmptyComp = path => {
  const compPath = `${getSspaPath(path)}/src/app/empty-route`;
  rimraf.sync(compPath);
};

const generateSspaBundle = async (projectPath, deployUrl, verbose) => {
  // let res;
  updateStatus(`Preparing project               `);
  await setupSspaProj(projectPath);

  updateStatus(`Preparing Bundle Folder        `);
  createBundleFolder(projectPath);

  updateStatus(`Setup Angular Build            `);
  replaceAngularJson(projectPath);

  updateStatus(`Building the Project           `);
  await exec(buildNgApp(projectPath));
  // verbose && showResult(res);
  updateStatus(`Copying Styles                 `);
  await copyStyles(projectPath);

  updateStatus(`Copying Scripts                `);
  await copyScripts(projectPath);

  updateStatus(`Updating WaveMaker App         `);
  await prepareApp(projectPath, deployUrl);
  
  updateStatus(`Adding Single-spa schematics   `);
  await exec(addSspa(projectPath));
  delSspaEmptyComp(projectPath);
  // verbose && showResult(res);

  updateStatus(`Building for Single-Spa       `);
  await exec(buildSspaApp(projectPath));
  // verbose && showResult(res);

  updateStatus(`Copying Final Files          `);
  await copyMain(projectPath);

  updateStatus(`Resetting the Project        `);
  cleanSspaProj(projectPath);

  printSuccess(`Artifacts are generated at: ${getBundlePath(projectPath)}`);
};
module.exports = {
  generateSspaBundle
};
