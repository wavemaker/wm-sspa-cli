const node_path = require("path");
const getWmNgAppName = ()=> 'wm-gen-ng-proj';
const getGeneratedApp = path => node_path.resolve(`${path}/${getWmNgAppName()}`);
// const getSspaPath = path => node_path.resolve(`${path}/wm-ng-app`);
const getSspaPath = path => getGeneratedApp(path);
const getBundlePath = path => node_path.resolve(`${path}/wm-sspa-dist`);
const getPOMPath = path => node_path.resolve(`${path}/pom.xml`);
module.exports = {
  getGeneratedApp,
  getBundlePath,
  getSspaPath,
  getPOMPath
};
