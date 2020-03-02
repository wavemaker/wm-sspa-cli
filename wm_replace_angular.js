const util = require("util");
const fs = require("fs");
const node_path = require("path");
const ncp = util.promisify(require("ncp").ncp);
const { getSspaPath } = require("./wm_utils");
const getAngularJsonPath = path => {
  return node_path.resolve(path ? `${getSspaPath(path)}/angular.json` : "");
};
const removeLazyEntries = options => options.map((op)=>(typeof op==="object"?op["input"]:op));
const replaceAngularJson = proj_path =>{
  const src_path = getAngularJsonPath(proj_path);
  const ng_json = require(src_path);
  const build_options = ng_json['projects']['angular-app']['architect']['build']['options'];
  ng_json['projects']['angular-app']['architect']['build']['builder']=ng_json['projects']['angular-app']['architect']['build-ng']['builder'];
  delete build_options['customWebpackConfig'];
  build_options['styles'] = removeLazyEntries(build_options['styles']);
  build_options['scripts'] = removeLazyEntries(build_options['scripts']);
  build_options['lazyModules'] = [];
  ng_json['projects']['angular-app']['architect']['build']['options'] = build_options;
  fs.writeFileSync(src_path,JSON.stringify(ng_json, null, 4),'utf-8');
}

module.exports = {
  replaceAngularJson
};
