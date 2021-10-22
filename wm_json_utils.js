const util = require("util");
const fs = require("fs");
const node_path = require("path");
const ncp = util.promisify(require("ncp").ncp);
const { getSspaPath } = require("./wm_utils");
const getWebpackConfigPath = path => node_path.resolve(path ? `${getSspaPath(path)}/extra-webpack.config.js` : "");
const getAngularJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/angular.json` : "");
const getPackageJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/package.json` : "");
const getTsConfigAppJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/src/tsconfig.app.json` : "");
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
  // ng_json["projects"]["angular-app"]["architect"]["build"]["builder"] =
  //   ng_json["projects"]["angular-app"]["architect"]["build-ng"]["builder"];
  /* Remote Custom Webpack Builder Config & IndexTransform */
  delete build_options["customWebpackConfig"];
  delete build_options["indexTransform"];
  /* Remove Lazy Scripts,Styles & Module Entries */
  build_options["styles"] = removeLazyEntries(build_options["styles"]);
  build_options["scripts"] = removeLazyEntries(build_options["scripts"]);
  // build_options["lazyModules"] = [];

  /* Assign Updated Values */
  ng_json["projects"]["angular-app"]["architect"]["build"][
    "options"
  ] = build_options;
  ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"] = build_config;
  fs.writeFileSync(src_path, JSON.stringify(ng_json, null, 4), "utf-8");
};
const updateWebpackConfig = proj_path => {
  const src_path = getWebpackConfigPath(proj_path);
  const webpackConfig = fs.readFileSync(src_path, "utf8");
  var newConfig = webpackConfig.replace(/\/\/ Feel free to modify this webpack config however you'd like to/gim, 'singleSpaWebpackConfig.module.rules.push({parser: {system: true}})');
  fs.writeFileSync(src_path, newConfig, "utf-8");
};
const updatePackageJson = (proj_path, sspaDeployUrl) => {
  const src_path = getPackageJsonPath(proj_path);
  const pkg_json = JSON.parse(fs.readFileSync(src_path));
  pkg_json["scripts"] = {
    ...pkg_json["scripts"],
    "build-prod": "ng build --c=development --output-hashing none --  --deploy-url " + sspaDeployUrl,
    "add-single-spa": "ng add single-spa-angular@4",
  };
  fs.writeFileSync(src_path, JSON.stringify(pkg_json, null, 4), "utf-8");
}
const updateTsConfigAppJson = proj_path => {
  const src_path = getTsConfigAppJsonPath(proj_path);
  const pkg_json = JSON.parse(fs.readFileSync(src_path));
  if(pkg_json && pkg_json["files"]){
    for(let i=0;i<pkg_json["files"].length;i++){
      let entry = pkg_json["files"][i];
      if(entry.includes("src/main.single-spa.ts")){
        pkg_json["files"][i] = "main.single-spa.ts"
        break;
      }
    }
  }
  fs.writeFileSync(src_path, JSON.stringify(pkg_json, null, 4), "utf-8");
}
module.exports = {
  replaceAngularJson,
  updatePackageJson,
  updateTsConfigAppJson,
  updateWebpackConfig
};
