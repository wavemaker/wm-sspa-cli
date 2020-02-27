const node_path = require("path");
const getGeneratedApp = path => node_path.resolve(`${path}/generated-angular-app`);
const getSspaPath = path => node_path.resolve(`${path}/wm-ng-app`);
const getBundlePath = path => node_path.resolve(`${path}/wm-sspa-dist`);
module.exports = {
  getGeneratedApp,
  getBundlePath,
  getSspaPath
};
