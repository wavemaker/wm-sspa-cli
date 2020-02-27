const util = require("util");
const fs = require("fs");
const node_path = require("path");
const ncp = util.promisify(require("ncp").ncp);
const { getSspaPath } = require("./wm_utils");
const getAngularJsonPath = path => {
  return node_path.resolve(path ? `${getSspaPath(path)}/angular.json` : "");
};
const wmTemplate = require(`./wm_template`);
const replaceAngularJson = proj_path => {
  const dest = getAngularJsonPath(proj_path);
  fs.writeFileSync(dest, wmTemplate.ngJsonTemplate(), "utf-8");
};
module.exports = {
  replaceAngularJson
};
