const fs = require("fs");
const node_path = require("path");
const { getSspaPath } = require("./wm_utils");

const getPagesConfigPath = path =>
  node_path.resolve(
    path ? `${path}/src/main/webapp/pages/pages-config.json` : ""
  );
const getRoutePath = path => node_path.resolve(`${getSspaPath(path)}/src/app`);
const getRouteFile = () => `/app.routes.ts`;
const getSspaRouteFile = () => `/sspa_app.routes.ts`;
const getAppModuleFile = path =>
  node_path.resolve(`${getRoutePath(path)}/app.module.ts`);
const getModuleName = value => `${value[0].toUpperCase()}${value.substr(1)}`;
const getComponentName = value => getModuleName(value);
const getDeployUrlStmt = url => `const deployUrl="${url || ""}"`;

const updateDeployUrl = (data, url) => `${getDeployUrlStmt(url)}\n${data}`;
const updateImports = data => `
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        "/services",
        "/resources",
        "resources/",
        "./services/",
        "j_spring_security_check",
        "/j_spring_security_check"
    ];
    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
      console.log("WM_SSPA_CLI | REQUEST | "+request.url);
        let redirectToWm = this.WM_REDIRECTS.some((url)=>request.url.startsWith(url));
        if(redirectToWm){
            request = request.clone({url:deployUrl+'/'+request.url});
        }
        return next.handle(request);
    }
}
\n${data}
`;

const updateAppModuleProviders = data => {
  let provRegex = /providers(\s)*:(\s)*\[/;
  let sInterceptor = `providers: [\n{provide: HTTP_INTERCEPTORS, useClass:WMInterceptor, multi: true},`;
  data = data.replace(provRegex, sInterceptor);
  return data;
};
const updateAppModuleImports = (data, path) => {
  let impRegex = /imports(\s)*:(\s)*\[((\s)*(.)*(,))+/;
  let impstr = data.match(impRegex)[0];
  impstr = impstr.replace(/CommonModule/, "NgCommonModule");
  impstr = impstr.replace(/RouterModule/, "AppRoutingModule");
  const pagesConfig = JSON.parse(
    fs.readFileSync(getPagesConfigPath(path), "utf-8")
  );
  const modules = [];
  // When Dynamic components are used int he app, all the widgets are added to the app module and then we duplicate
  // definitions of the modules with the same name. So creating an alias to avoid the conflicts. Prepending with Page/Partial
  // to the module name
  const conflictModules = ["Login", "header", "footer"];
  const moduleImports = pagesConfig.map(c => {
    if(conflictModules.includes(c.name)) {
        modules.push(`${c.type === "PAGE" ? "Page" : "Partial"}${getModuleName(c.name)}Module`);
        return `import { ${getModuleName(c.name)}Module as ${c.type === "PAGE" ? "Page" : "Partial"}${getModuleName(c.name)}Module } from "./${
            c.type === "PAGE" ? "pages" : "partials"
            }/${c.name}/${c.name}.module"`;
    } else {
        modules.push(`${getModuleName(c.name)}Module`);
        return `import { ${getModuleName(c.name)}Module } from "./${
            c.type === "PAGE" ? "pages" : "partials"
            }/${c.name}/${c.name}.module"`
    }
  });
  let modulesStr = modules.join(`,`);
  impstr = impstr.replace(/WM_MODULES_FOR_ROOT,/, "WM_MODULES_FOR_ROOT,"+modulesStr+",");

  data = data.replace(impRegex, impstr);
  return `${moduleImports.join(`\n`)}\n${data}`;
};

const updateAppModule = async (proj_path, url) => {
  let moduleData = fs.readFileSync(getAppModuleFile(proj_path), "utf-8");
  moduleData = updateAppModuleProviders(moduleData);
  moduleData = updateAppModuleImports(moduleData, proj_path);
  moduleData = updateAppRoutingModule(moduleData);
  moduleData = updateInterceptor(moduleData);
  moduleData = updateCommonModule(moduleData);
  moduleData = updateRouteImport(moduleData);
  moduleData = updateImports(moduleData);
  moduleData = updateDeployUrl(moduleData, url);
  fs.writeFileSync(getAppModuleFile(proj_path), moduleData, "utf-8");
};

const updateRoutes = async path => {

  const pageStack = [];
  const data = fs.readFileSync(getRoutePath(path) + getRouteFile(), "utf8");

  let dataArr = data.split("\n");
  let isLoadChildren = false;
  for (let i = 0; i < dataArr.length; i++) {
    let d = dataArr[i];
    if (d.includes("path:")) {
      let pageName = d.split(":")[1].trim();
      pageName = pageName
        .substr(1, pageName.length - 3)
        .split("*")
        .join("");
      pageName && pageStack.push(pageName);
    } else if (d.includes("loadChildren:")) {
      isLoadChildren = true;
      dataArr[i] = pageStack.length
        ? `component:${getComponentName(
            pageStack[pageStack.length - 1]
          )}Component,`
        : ``;
    } else if (d.includes("{") || d.includes("}")) {
      isLoadChildren = false;
    } else if (isLoadChildren) {
      dataArr[i] = "";
    }
  }
  const pageImports = pageStack.map(
    p =>
      `import {${getComponentName(
        p
      )}Component} from "./pages/${p}/${p}.component"`
  );
  dataArr = [...pageImports, ...dataArr].join("\n");
  fs.writeFileSync(getRoutePath(path) + getSspaRouteFile(), dataArr, "utf8");
};

const updateMarkUp = async path => {
  let pagesConfig = JSON.parse(
    fs.readFileSync(getPagesConfigPath(path), "utf8")
  );
  pagesConfig = pagesConfig.map(p => {
    let filePath = node_path.resolve(
      `${getSspaPath(path)}/src/app/${
        p.type === "PAGE" ? "pages" : "partials"
      }/${p.name}/${p.name}.component.html`
    );
    let content = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(
      filePath,
      content.replace(/scripts-to-load="(_|-|\.|[a-z]|,)*"/g, ""),
      "utf8"
    );
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
const addEmptyCompToApp = proj_path => {
  let moduleData = fs.readFileSync(getAppModuleFile(proj_path), "utf-8");
  moduleData = updateDeclarations(moduleData);
  moduleData = updateEmptyCompImport(moduleData);
  fs.writeFileSync(getAppModuleFile(proj_path), moduleData, "utf-8");
};
const updateApp = async projectPath => {
  addEmptyCompToApp(projectPath);
  addEmptyCompToRoutes(projectPath);
};
module.exports = {
  prepareApp: async (projectPath, deployUrl) => {
    await updateRoutes(projectPath);
    await updateAppModule(projectPath, deployUrl);
    await updateMarkUp(projectPath);
  },
  updateApp
};
