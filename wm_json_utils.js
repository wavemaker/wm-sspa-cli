const util = require("util");
const fs = require("fs");
const node_path = require("path");
const ncp = util.promisify(require("ncp").ncp);
const { getSspaPath } = require("./wm_utils");
const getAngularJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/angular.json` : "");
const getPackageJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/package.json` : "");
;
const removeLazyEntries = options =>
  options.map(op => (typeof op === "object" ? op["input"] : op));
const replaceAngularJson = proj_path => {
  const src_path = getAngularJsonPath(proj_path);
  const ng_json = JSON.parse(fs.readFileSync(src_path));
  const build_options =
    ng_json["projects"]["angular-app"]["architect"]["build"]["options"];
  
  const build_config = ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"];
  /* Disable Vendor Chunk */
  build_config["vendorChunk"] = false;
  /* Assign default Angular Builder */
  ng_json["projects"]["angular-app"]["architect"]["build"]["builder"] =
    ng_json["projects"]["angular-app"]["architect"]["build-ng"]["builder"];
  /* Remote Custom Webpack Builder Config */
  delete build_options["customWebpackConfig"];
  /* Remote Lazy Scripts,Styles & Module Entries */
  build_options["styles"] = removeLazyEntries(build_options["styles"]);
  build_options["scripts"] = removeLazyEntries(build_options["scripts"]);
  build_options["lazyModules"] = [];

  /* Assign Updated Values */
  ng_json["projects"]["angular-app"]["architect"]["build"][
    "options"
  ] = build_options;
  ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"] = build_config;
  fs.writeFileSync(src_path, JSON.stringify(ng_json, null, 4), "utf-8");
};
const updatePackageJson = proj_path => {
  const src_path = getPackageJsonPath(proj_path);
  const pkg_json = JSON.parse(fs.readFileSync(src_path));
  pkg_json["scripts"] = {
    ...pkg_json["scripts"],
    "build-prod": "ng build --prod",
    "add-single-spa": "ng add single-spa-angular@3",
  };
  fs.writeFileSync(src_path, JSON.stringify(pkg_json, null, 4), "utf-8");
}
module.exports = {
  replaceAngularJson,
  updatePackageJson
};
