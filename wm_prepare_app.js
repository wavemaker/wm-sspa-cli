const fs = require("fs");
const wmTemplate = require("./wm_template");
const { getSspaPath } = require("./wm_utils");

const getPagesConfigPath = path =>
  path ? `${path}/src/main/webapp/pages/pages-config.json` : "";
const getRoutePath = path => `${getSspaPath(path)}/src/app`;
const getRouteFile = () => `/app.routes.ts`;
const getSspaRouteFile = () => `/sspa_app.routes.ts`;
const getAppModuleFile = path => `${getRoutePath(path)}/app.module.ts`;
const getTemplateAppModuleFile = () => `./templates/app.module.ts`;
const getModuleName = value => `${value[0].toUpperCase()}${value.substr(1)}`;
const getComponentName = value => getModuleName(value);
const getDeployUrlStmt = url => `const deployUrl="${url || ""}"`;
const updateAppModule = async (path, url) => {
  const pagesConfig = JSON.parse(
    fs.readFileSync(getPagesConfigPath(path), "utf-8")
  );
  const modules = [];
  const moduleImports = pagesConfig.map(c => {
    modules.push(`${getModuleName(c.name)}Module`);
    return `import {${getModuleName(c.name)}Module} from "./${
      c.type === "PAGE" ? "pages" : "partials"
    }/${c.name}/${c.name}.module"`;
  });

  let templateAppModule = wmTemplate
    .appModuleTemplate()
    .split("{{PAGE_REPLACE_MODULE}}");
  templateAppModule = [
    getDeployUrlStmt(url),
    ...moduleImports,
    templateAppModule[0],
    modules.join(","),
    templateAppModule[1]
  ];
  fs.writeFileSync(
    getAppModuleFile(path),
    templateAppModule.join("\n"),
    "utf8"
  );
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
        ? `component:${getComponentName(pageStack[pageStack.length - 1])}Component`
        : ``;
    } else if(d.includes("{") || d.includes("}")){
      isLoadChildren = false;
    } else if(isLoadChildren){
      dataArr[i]=""
    }
  }
  const pageImports = pageStack.map(
    p => `import {${getComponentName(p)}Component} from "./pages/${p}/${p}.component"`
  );
  dataArr = [...pageImports, ...dataArr].join("\n");
  fs.writeFileSync(getRoutePath(path) + getSspaRouteFile(), dataArr, "utf8");
};

const updateMarkUp = async path => {
  let pagesConfig = JSON.parse(
    fs.readFileSync(getPagesConfigPath(path), "utf8")
  );
  pagesConfig = pagesConfig.map(p => {
    let filePath = `${getSspaPath(path)}/src/app/${
      p.type === "PAGE" ? "pages" : "partials"
    }/${p.name}/${p.name}.component.html`;
    let content = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(
      filePath,
      content.replace(/scripts-to-load="(_|-|\.|[a-z]|,)*"/g, ""),
      "utf8"
    );
  });
};

module.exports = {
  prepareApp: async (projectPath, deployUrl) => {
    await updateRoutes(projectPath);
    await updateAppModule(projectPath, deployUrl);
    await updateMarkUp(projectPath);
  }
};


