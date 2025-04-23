// read POM.xml > <wavemaker.app.runtime.ui.version>10.3.1.6</wavemaker.app.runtime.ui.version>
// Prepare S3 Url
// Download the zip
const { getPOMPath, execCommand} = require("./wm_utils");
const fs = require("fs");
const https = require("https");
const node_path = require('path');
const { getGeneratedApp } = require("./wm_utils");
const getCodegenPath = path => node_path.resolve(`${path}/`);
const getWmCodegenZipPath = path => node_path.resolve(`${path}/wm-ng-codegen.zip`);
const getCodegenCliPath = (path) => node_path.resolve(`${getCodegenPath(path)}/src/codegen-args-cli.js`);
const getProjVersion = path => {
    if(global.runtimeVersion) {
        return global.runtimeVersion;
    } else {
        const pomContent = fs.readFileSync(getPOMPath(path), "utf8");
        const RUNTIME_TAG_BEGIN = `<wavemaker.app.runtime.ui.version>`;
        const RUNTIME_TAG_END = `</wavemaker.app.runtime.ui.version>`;
        let pVersion = '';
        let vStart = pomContent.indexOf(RUNTIME_TAG_BEGIN),
            vEnd = pomContent.indexOf(RUNTIME_TAG_END);
        if (vStart && vEnd) {
            vStart = vStart + RUNTIME_TAG_BEGIN.length;
            pVersion = pomContent.substr(vStart, vEnd - vStart).trim();
        }
        global.runtimeVersion = pVersion;
        return pVersion;
    }
};

const execNpmInstall = async path => {
    let codegenCmd = `cd ${getCodegenPath(path)} && npm i`;
    await execCommand(codegenCmd).catch((err) => { console.error(`Something went wrong while running command ${codegenCmd}`, err) });
}

const getCodegenPackageName = ()=>{
   return '@wavemaker/angular-codegen';
}

const installCodegen = async (path) => {
    let codegenCmd = `npm install --legacy-peer-deps=true --prefix ${path} --no-save ${getCodegenPackageName()}@${getProjVersion(path)}`;
    await execCommand(codegenCmd).catch((err) => { console.error(`Something went wrong while running command ${codegenCmd}`, err) });
}
const execCodegenCli = async (codegenPath, projectPath) => {
    let angularCodegenPath = getCodegenPath(codegenPath);
    let codegenCliCmd = `node ${getCodegenCliPath(codegenPath)} -s ${node_path.resolve(projectPath)} -t ${getGeneratedApp(projectPath)} --codegenPath=${angularCodegenPath}`
    await execCommand(codegenCliCmd).catch((err) => { console.error(`Something went wrong while running command ${codegenCliCmd}`, err) });
}
const execCodegen = async (codegenPath, projectPath) => {
    await execNpmInstall(codegenPath);
    await execCodegenCli(codegenPath, projectPath);
}
const generateNgCode = async path => {
  await installCodegen(path);
  await execCodegen(`${path}/node_modules/${getCodegenPackageName(path)}`, path);
};
module.exports = {
    getProjVersion,
    generateNgCode
};
