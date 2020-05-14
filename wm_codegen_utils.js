// read POM.xml > <wavemaker.app.runtime.ui.version>10.3.1.6</wavemaker.app.runtime.ui.version>
// Prepare S3 Url
// Download the zip
const { getPOMPath } = require("./wm_utils");
const fs = require("fs");
const https = require("https");
const extract = require("extract-zip");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const node_path = require('path');
const { getGeneratedApp } = require("./wm_utils");
const getCodegenPath = path => node_path.resolve(`${path}/codegen-app`);
const getWmCodegenZipPath = path => node_path.resolve(`${path}/wm-ng-codegen.zip`);
const getCodegenCliPath = (path) => node_path.resolve(`${getCodegenPath(path)}/src/codegen-cli.js`);
const getProjVersion = path => {
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
  return pVersion;
};
const extractCodegeZip = async path => {
  await extract(getWmCodegenZipPath(path), { dir: path });
};
const getCodegenS3Path = (version='') =>
  version!==''?`https://s3.amazonaws.com/maven.wavemaker.com/release/com/wavemaker/app/build/wavemaker-ng-codegen/${version}/wavemaker-ng-codegen-${version}-wmapp.zip`:'';
const downloadCodegenZip = async path => {
  return new Promise((resolve, reject) => {
    try {
      const codegenZip = fs.createWriteStream(getWmCodegenZipPath(path));
      https.get(getCodegenS3Path(getProjVersion(path)), res => {
        res.pipe(codegenZip);
        codegenZip.on("finish", () => {
          codegenZip.close();
          resolve();
        });
      });
    } catch (e) {
      console.error(`Could not download codegen | ${e}`);
      reject(e);
    }
  });
};
const execNpmInstall = async path => {
    await exec(`cd ${getCodegenPath(path)} && npm i`);
}
const execCodegenCli = async path => {
  await exec(`cd ${getCodegenPath(path)} && node ${getCodegenCliPath(path)} -s ${node_path.resolve(path)} -t ${getGeneratedApp(path)}`);
  
}
const execCodegen = async path => {
    await execNpmInstall(path);
    await execCodegenCli(path);
}
const generateNgCode = async path => {
  await downloadCodegenZip(path);
  await extractCodegeZip(path);
  await execCodegen(path);
};
module.exports = {
  generateNgCode
};
