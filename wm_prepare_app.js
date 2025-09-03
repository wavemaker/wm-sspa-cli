const fs = require("fs");
const node_path = require("path");
const { getSspaPath } = require("./wm_utils");

const { getGeneratedApp } = require("./wm_utils");
const { getMainSingleSPATemplate } = require("./getMainSingleSPATemplate");
const { getSSPACustomWebpackTemplate } = require("./sspaCustomWebpackConfigTemplate");
const { getSSPAPostBuildScriptTemplate } = require("./sspaPostBuild");
const { updateLibraryTarget } = require("./wm_json_utils");
const { getPrefabsUsedInApp } = require("./wm_prefab_utils");

const getPagesConfigPath = path =>
  node_path.resolve(
    path ? `${path}/src/main/webapp/pages/pages-config.json` : ""
  );
const getRoutePath = path => node_path.resolve(`${getSspaPath(path)}/src/app`);
const getRouteFile = () => `/app.routes.ts`;
const getSspaRouteFile = () => `/sspa_app.routes.ts`;
const getAppConfigFile = path =>
  node_path.resolve(`${getRoutePath(path)}/app.config.ts`);
// const getModuleName = value => `${value[0].toUpperCase()}${value.substr(1)}`;
const getComponentName = value => `${value[0].toUpperCase()}${value.substr(1)}`;
const getDeployUrlStmt = url => `const deployUrl="${url || ""}"`;

const updateDeployUrl = (data, url) => {
    if(typeof url !== "undefined") {
        return `${getDeployUrlStmt(url)}\n${data}`;
    }
    //url is not known in the case of PORTABLE_BUILD. so just return the input data
    return `\n${data}`;
};
const updateImports = data => `
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
\n${data}`;
const updateCommonModule = data =>
  data.replace(
    /import(\s)+{(\s)*CommonModule/,
    "import { CommonModule as NgCommonModule"
  );
const updateRouteImport = data =>
  data.replace(
    /import(\s)+{(\s)*routes(\s)*}(\s)+from(\s)+\'\.\/app.routes\'/,
    `import { routes } from './sspa_app.routes'`
  );
const updateAppRoutingModule = data => `
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:[RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration:'top'})],
  exports:[RouterModule],
  providers:[{provide:APP_BASE_HREF, useValue:"/"}]
})
export class AppRoutingModule{};
\n${data}
`;
const updateInterceptor = data => `
@Injectable()
export class WMInterceptor implements HttpInterceptor {
    WM_REDIRECTS = [
        "services",
        "prefabs",
        "resources",
        "ng-bundle",
        "j_spring_security_check",
    ];
    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
      function normalizePath(path) {
         if (!path) return path;
         // Remove any number of leading ./ or ../ segments
         return path.replace(/^((\\.{1,2}\\/)|\\/)+/, "");
      }
      request = request.clone({url:normalizePath(request.url)});
      console.log("WM_SSPA_CLI | REQUEST | "+request.url);
        let redirectToWm = this.WM_REDIRECTS.some((url)=>request.url.startsWith(url));
        let isPathMappingReq = request.url.indexOf("path_mapping.json") !== -1;
        //@ts-ignore
        let deployUrl = _WM_APP_PROPERTIES.deployUrl;
        if (redirectToWm) {
            request = request.clone({url:deployUrl+'/'+request.url});
        }
        if (isPathMappingReq) {
            //just return empty data for path_mapping json request as all the files are 
            // already merged into scripts.js
            return new Observable(observer => {
                observer.next(new HttpResponse({ status: 200, body: {} }));
                observer.complete();
            });
        } 
        return next.handle(request);
    }
}
\n${data}
`;

const updateAppConfigProviders = data => {
  let provRegex = /providers(\s)*:(\s)*\[/;
  let sInterceptor = `providers: [\n
  {
    provide: HTTP_INTERCEPTORS, 
    useClass:WMInterceptor, 
    multi: true
  },\n
  {
   provide: APP_INITIALIZER,
   useFactory: downloadPrefabsScripts,
   multi: true
  },\n`;
  data = data.replace(provRegex, sInterceptor);
  return data;
};
const updateAppConfigImports = (data, path) => {
  const pagesConfig = JSON.parse(
    fs.readFileSync(getPagesConfigPath(path), "utf-8")
  );
  const modules = [];
  // When Dynamic components are used in the app, all the widgets are added to the app module and then we duplicate
  // definitions of the modules with the same name. So creating an alias to avoid the conflicts. Prepending with Page/Partial
  // to the module name
  const conflictModules = ["Login", "header", "footer"];
  const moduleImports = pagesConfig.map(c => {
    if(conflictModules.includes(c.name)) {
        modules.push(`${c.type === "PAGE" ? "Page" : "Partial"}${getComponentName(c.name)}Component`);
        return `import { ${getComponentName(c.name)}Component as ${c.type === "PAGE" ? "Page" : "Partial"}${getComponentName(c.name)}Component } from "./${
            c.type === "PAGE" ? "pages" : "partials"
            }/${c.name}/${c.name}.component"`;
    } else {
        modules.push(`${getComponentName(c.name)}Component`);
        return `import { ${getComponentName(c.name)}Component } from "./${
            c.type === "PAGE" ? "pages" : "partials"
            }/${c.name}/${c.name}.component"`
    }
  });
  moduleImports.push("import { getSingleSpaExtraProviders } from 'single-spa-angular';");
  let modulesStr = modules.join(`,`);

  data = data.replace(/\.{3}wmModules/, "...wmModules, ...getSingleSpaExtraProviders()");
  data = data.replace(/\.{3}getSingleSpaExtraProviders\(\)/, "...getSingleSpaExtraProviders(),"+modulesStr+",");
  return `${moduleImports.join(`\n`)}\n${data}`;
};

const updateAppConfig = async (proj_path, url) => {
  let moduleData = fs.readFileSync(getAppConfigFile(proj_path), "utf-8");

  moduleData = updateAppConfigProviders(moduleData);
  moduleData = updateAppConfigImports(moduleData, proj_path);
  moduleData = updateAppRoutingModule(moduleData);
  moduleData = updateInterceptor(moduleData);
  moduleData = updateCommonModule(moduleData);
  moduleData = updateRouteImport(moduleData);
  moduleData = updateImports(moduleData);
  moduleData = updateDeployUrl(moduleData, url);
  fs.writeFileSync(getAppConfigFile(proj_path), moduleData, "utf-8");
};

const updateRoutes = async path => {
  const data = fs.readFileSync(node_path.join(getRoutePath(path), getRouteFile()), "utf8");
  fs.writeFileSync(node_path.join(getRoutePath(path), getSspaRouteFile()), data, "utf8");
};

const updateMarkUp = async path => {
    let dirList = ['pages', 'partials', 'prefabs'];
    let rootDir = `${getSspaPath(path)}/src/app`;
    dirList.forEach(directory => {
        let dirPath = `${rootDir}/${directory}`;
        try {
            fs.accessSync(dirPath, fs.constants.F_OK | fs.constants.R_OK);
            const items = fs.readdirSync(dirPath);
            items.forEach(dir => {
                const itemPath = node_path.join(dirPath, dir);
                const stats = fs.statSync(itemPath);
                if (stats.isDirectory()) {
                    let filePath = `${itemPath}/${dir}.component.html`;
                    let content = fs.readFileSync(filePath, "utf8");
                    fs.writeFileSync(
                        filePath,
                        content.replace(/scripts-to-load="(_|-|\.|[a-z]|,)*"/g, ""),
                        "utf8"
                    );
                }
            });
        } catch (err) {
            //don't do anything and continue with the other folders
            //console.info(`${directory} not present and returned with ${err}`);
        }
    });
};
const updateEmptyCompImport = data =>
  `import { EmptyRouteComponent } from "./empty-route/empty-route.component";\n ${data}`;
const updateEmptyRouteComp = data => {
  const pnfRegEx = /canActivate(\s*):(\s*)\[PageNotFoundGaurd\],/;
  const empCompRegEx = /canActivate(\s*):(\s*)\[PageNotFoundGaurd\],(\s*)component(\s*):(\s*)EmptyPageComponent/;
  data = updateEmptyCompImport(
    data.replace(pnfRegEx, ``)
  );
  return data;
};
const addEmptyCompToRoutes = proj_path => {
  let data = fs.readFileSync(
    getRoutePath(proj_path) + getSspaRouteFile(),
    "utf8"
  );
  data = updateEmptyRouteComp(data);
  fs.writeFileSync(getRoutePath(proj_path) + getSspaRouteFile(), data, "utf8");
};
const updateDeclarations = data => {
  const decRegEx = /declarations(\s*):(\s*)\[(\s*)\]/;
  data = data.replace(decRegEx, `declarations: [EmptyRouteComponent]`);
  return data;
};

const updateAppConfigWithPrefabUrls = proj_path => {
    let moduleData = fs.readFileSync(getAppConfigFile(proj_path), "utf-8");
    getPrefabsUsedInApp(proj_path).then(function(prefabs) {
        const prefabsStr = prefabs.length ? `["${prefabs.join('", "')}"]` : '[]';
        let prefabPattern = /(export const isPrefabInitialized = initPrefabConfig\(\);)/ig;
        let prefabUrlsTemplate = `
        import { getPrefabConfig } from '../framework/util/page-util';
        import { APP_INITIALIZER } from '@angular/core';
        export function downloadPrefabsScripts() {
            return () => {
                //@ts-ignore
                let prefabBaseUrl = _WM_APP_PROPERTIES.deployUrl + "/app/prefabs";
                //@ts-ignore
                let usedPrefabs = ${prefabsStr};
                usedPrefabs.forEach(function(prefabName){
                    let prefabConfig = getPrefabConfig(prefabName);
                    let prefabUrl = prefabBaseUrl + "/" + prefabName;
                    prefabConfig.resources.scripts = prefabConfig.resources.scripts.map(script => prefabUrl + script)
                    prefabConfig.resources.styles = prefabConfig.resources.styles.map(style => prefabUrl + style)
                });
            };
        }
        `;
        moduleData = moduleData.replace(prefabPattern, "$1\n" + prefabUrlsTemplate);
        fs.writeFileSync(getAppConfigFile(proj_path), moduleData, "utf-8");
    });
};

const addEmptyCompToApp = proj_path => {
  let moduleData = fs.readFileSync(getAppConfigFile(proj_path), "utf-8");
  moduleData = updateDeclarations(moduleData);
  moduleData = updateEmptyCompImport(moduleData);
  fs.writeFileSync(getAppConfigFile(proj_path), moduleData, "utf-8");
};

const updateMainSingleSPA = proj_path => {
    let path = node_path.resolve(`${getGeneratedApp(proj_path)}/src/main.single-spa.ts`);
    fs.writeFileSync(path, getMainSingleSPATemplate(), {encoding:'utf8',flag:'w'});
};

const updateExtraWebpack = proj_path => {
    let path = node_path.resolve(`${getGeneratedApp(proj_path)}/extra-webpack.config.js`);
    fs.writeFileSync(path, getSSPACustomWebpackTemplate(), {encoding:'utf8',flag:'w'});
};

const updateEnvFiles = (proj_path, deployUrl, sspaDeployUrl, splitStyles, mountStyles, isHashingEnabled) => {
    let styles = getStyles(splitStyles, isHashingEnabled);
    let envProdPath = node_path.resolve(`${getGeneratedApp(proj_path)}/src/environments/environment.prod.ts`);
    let envProdData = fs.readFileSync(envProdPath, "utf-8");
    const prodPropRegEx = /production: true/;

    let isPortableBuildEnabled = process.env["PORTABLE_BUILD"] === "true";

    if(!isPortableBuildEnabled) {
        deployUrl = deployUrl ? (deployUrl.slice(-1)==='/'?deployUrl.slice(0,-1):deployUrl) : "";
        sspaDeployUrl = sspaDeployUrl ? (sspaDeployUrl.slice(-1)==='/'?sspaDeployUrl.slice(0,-1):sspaDeployUrl) : "";
    }
    if(isPortableBuildEnabled) {
        envProdData = envProdData.replace(prodPropRegEx, `production: true, splitStyles: ${splitStyles}, mountStyles: ${mountStyles}, styles: "${styles}"`);
    } else {
        envProdData = envProdData.replace(prodPropRegEx, `production: true, deployUrl: "${deployUrl}", sspaDeployUrl: "${sspaDeployUrl}", splitStyles: ${splitStyles}, mountStyles: ${mountStyles}, styles: "${styles}"`);
    }
    fs.writeFileSync(envProdPath, envProdData, "utf-8");

    let envDevPath = node_path.resolve(`${getGeneratedApp(proj_path)}/src/environments/environment.dev.ts`);
    let envDevData = fs.readFileSync(envProdPath, "utf-8");
    const devPropRegEx = /production: false/;
    if(isPortableBuildEnabled) {
        envDevData = envDevData.replace(devPropRegEx, `production: false, splitStyles: ${splitStyles}, mountStyles: ${mountStyles}, styles: "${styles}"`);
    } else {
        envDevData = envDevData.replace(devPropRegEx, `production: false, deployUrl: "${deployUrl}", sspaDeployUrl: "${sspaDeployUrl}", splitStyles: ${splitStyles}, mountStyles: ${mountStyles}, styles: "${styles}"`);
    }
    fs.writeFileSync(envDevPath, envDevData, "utf-8");
};

const getStyles = (splitStyles, isHashingEnabled) => {
    let styles = [];
    if(isHashingEnabled === 'true') {
       styles.push('styles.{styles-hash}.css');
        if (splitStyles === 'true') {
            styles.push('wm-theme-styles.{wm-theme-styles-hash}.css');
            styles.push('wm-app-styles.{wm-app-styles-hash}.css');
        } else {
            styles.push('wm-styles.{wm-styles-hash}.css');
        }
    } else{
        styles.push('styles.css');
        if (splitStyles === 'true') {
            styles.push('wm-theme-styles.css');
            styles.push('wm-app-styles.css');
        } else {
            styles.push('wm-styles.css');
        }
    }
    return styles;
}

const addPostBuildScript = (projectPath) => {
    let path = node_path.resolve(`${getGeneratedApp(projectPath)}/build-scripts/sspa-post-build.js`);
    fs.writeFileSync(path, getSSPAPostBuildScriptTemplate(), {encoding:'utf8',flag:'w'});
}

const updateApp = async (projectPath, deployUrl, sspaDeployUrl, libraryTarget, splitStyles, mountStyles, isHashingEnabled) => {
  addEmptyCompToApp(projectPath);
  addEmptyCompToRoutes(projectPath);
  updateAppConfigWithPrefabUrls(projectPath);
  updateMainSingleSPA(projectPath);
  updateExtraWebpack(projectPath);
  updateEnvFiles(projectPath, deployUrl, sspaDeployUrl, splitStyles, mountStyles, isHashingEnabled);
  addPostBuildScript(projectPath);
};
module.exports = {
  prepareApp: async (projectPath, deployUrl) => {
    await updateRoutes(projectPath);
    await updateAppConfig(projectPath, deployUrl);
    await updateMarkUp(projectPath);
  },
  updateApp
};
