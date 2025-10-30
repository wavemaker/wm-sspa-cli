const util = require("util");
const fs = require("fs");
const node_path = require("path");
const ncp = util.promisify(require("ncp").ncp);
const { getSspaPath } = require("./wm_utils");
const getWebpackConfigPath = path => node_path.resolve(path ? `${getSspaPath(path)}/extra-webpack.config.js` : "");
const getAngularJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/angular.json` : "");
const getPackageJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/package.json` : "");
const getTsConfigAppJsonPath = path => node_path.resolve(path ? `${getSspaPath(path)}/src/tsconfig.app.json` : "");

const removeLazyEntries = options =>
  options.map(op => (typeof op === "object" ? op["input"] : op));

const replaceAngularJson = (proj_path, splitStyles, libraryTarget) => {
  const src_path = getAngularJsonPath(proj_path);
  const ng_json = JSON.parse(fs.readFileSync(src_path));
  const build_options = ng_json["projects"]["angular-app"]["architect"]["build"]["options"];
  build_options["outputPath"] = 'dist/ng-bundle';
  if(process.env["PORTABLE_BUILD"] === "true") {
      delete build_options["deployUrl"];
  }
  const build_config = ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"];
  /* Disable Vendor Chunk */
  build_config["vendorChunk"] = false;
  /* Assign default Angular Builder */
  // ng_json["projects"]["angular-app"]["architect"]["build"]["builder"] =
  //   ng_json["projects"]["angular-app"]["architect"]["build-ng"]["builder"];
  /* Remote Custom Webpack Builder Config & IndexTransform */
  // delete build_options["customWebpackConfig"];
  delete build_options["indexTransform"];
  build_options["customWebpackConfig"]["libraryTarget"] = libraryTarget;
  //Don't bother about generating index.html
  build_options["index"] = "";

      /* Remove Lazy Scripts,Styles & Module Entries */
    if(splitStyles === 'true') {
       let existingStyles = build_options["styles"];
       existingStyles.map(function(styleSheet) {
           if (typeof styleSheet === "object") {
               if (styleSheet["input"].includes('app.css')) {
                   styleSheet['bundleName'] = 'wm-app-styles';
               }
               if (styleSheet["input"].includes('src/assets/themes')) {
                   styleSheet['bundleName'] = 'wm-theme-styles';
               }
           }
       });
       build_options["styles"] = existingStyles;
   }
   build_options["scripts"] = removeLazyEntries(build_options["scripts"]);
   // build_options["lazyModules"] = [];

  /* Assign Updated Values */
  ng_json["projects"]["angular-app"]["architect"]["build"]["options"] = build_options;
  ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"] = build_config;
  delete ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"]["customWebpackConfig"];
  delete ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["development"]["customWebpackConfig"];
  fs.writeFileSync(src_path, JSON.stringify(ng_json, null, 4), "utf-8");
};
const updateLibraryTarget = (proj_path, libraryTarget) => {
  const src_path = getAngularJsonPath(proj_path);
  const ng_json = JSON.parse(fs.readFileSync(src_path));
  const build_options = ng_json["projects"]["angular-app"]["architect"]["build"]["options"];
  const build_config = ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"];
  build_options["customWebpackConfig"]["libraryTarget"] = libraryTarget;
  //Don't bother about generating index.html
  build_options["index"] = "";

  /* Assign Updated Values */
  ng_json["projects"]["angular-app"]["architect"]["build"]["options"] = build_options;
  ng_json["projects"]["angular-app"]["architect"]["build"]["configurations"]["production"] = build_config;
  fs.writeFileSync(src_path, JSON.stringify(ng_json, null, 4), "utf-8");
};
const updateWebpackConfig = proj_path => {
  // const src_path = getWebpackConfigPath(proj_path);
  // const webpackConfig = fs.readFileSync(src_path, "utf8");
  // var newConfig = webpackConfig.replace(/\/\/ Feel free to modify this webpack config however you'd like to/gim, 'singleSpaWebpackConfig.module.rules.push({parser: {system: true}})');
  // fs.writeFileSync(src_path, newConfig, "utf-8");
};
const updatePackageJson = (proj_path, isHashingEnabled, sspaDeployUrl) => {
  if(!sspaDeployUrl || sspaDeployUrl == 'undefined'){
    sspaDeployUrl =  'ng-bundle/'
  }
  const src_path = getPackageJsonPath(proj_path);
  let pkg_json = JSON.parse(fs.readFileSync(src_path));
  pkg_json["scripts"] = {
    ...pkg_json["scripts"],
  };
  pkg_json = addSSPABuildTarget(pkg_json, isHashingEnabled, sspaDeployUrl);
  pkg_json = addSSPASchematics(pkg_json);
  fs.writeFileSync(src_path, JSON.stringify(pkg_json, null, 4), "utf-8");
}

const addSSPABuildTarget = (pkgJson, isHashingEnabled, sspaDeployUrl) => {
    let packageJson = pkgJson;
    if(process.env["PORTABLE_BUILD"] === "true") {
        if(isHashingEnabled === 'true') {
            packageJson["scripts"] = {
                ...packageJson["scripts"],
                "build:sspa": "ng build --c=production --output-hashing bundles",
                "postbuild:sspa": "node build-scripts/sspa-post-build.js",
            };
        } else {
            packageJson["scripts"] = {
                ...packageJson["scripts"],
                "build:sspa": "ng build --c=production",
            };
        }
    } else {
        if(isHashingEnabled === 'true') {
            packageJson["scripts"] = {
                ...packageJson["scripts"],
                "build:sspa": "ng build --c=production --output-hashing bundles --deploy-url " + sspaDeployUrl,
                "postbuild:sspa": "node build-scripts/sspa-post-build.js",
            };
        } else {
            packageJson["scripts"] = {
                ...packageJson["scripts"],
                "build:sspa": "ng build --c=production --deploy-url " + sspaDeployUrl,
            };
        }
    }
    return packageJson;
}

const addSSPASchematics = (pkgJson) => {
    let packageJson = pkgJson;
    if(isIvyProject(pkgJson)) {
        packageJson["scripts"] = {
            ...packageJson["scripts"],
            "add-single-spa": "ng add --skip-confirmation single-spa-angular@8",
        };
    } else {
        if(isOldProject(pkgJson)) {
            //for ng 11 and less versions
            packageJson["scripts"] = {
                ...packageJson["scripts"],
                "add-single-spa": "ng add single-spa-angular@4",
            };
        } else {
            //for ng 12 and more versions
            packageJson["scripts"] = {
                ...packageJson["scripts"],
                "add-single-spa": "ng add --skip-confirmation single-spa-angular@5",
            };
            //pkg_json["devDependencies"]["@angular-builders/custom-webpack"] = "12.1.3"
            packageJson["devDependencies"]["@angular-devkit/build-angular"] = "0.1102.19"
        }
    }
    return packageJson;
}

const isOldProject = (pkgJson) => {
    let ngCliVersion = pkgJson["devDependencies"]["@angular/cli"];
    let version = parseInt(ngCliVersion.split(".")[0]);
    return version < 12;
}
const isIvyProject = (pkgJson) => {
    let ngCliVersion = pkgJson["devDependencies"]["@angular/cli"];
    let version = parseInt(ngCliVersion.split(".")[0]);
    return version > 14;
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
  updateLibraryTarget,
  updatePackageJson,
  updateTsConfigAppJson,
  updateWebpackConfig
};
