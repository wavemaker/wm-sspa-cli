
const util = require('util');
const fs = require("fs");
const ncp = util.promisify(require('ncp').ncp);
const getAngularJsonPath = (path)=>{
    return path?path+'/generated-angular-app/angular.json':null;
}
const wmTemplate = require(`./wm_template`);
module.exports = {
    replaceAngularJson : async (proj_path)=>{
        const dest = getAngularJsonPath(proj_path);
        fs.writeFileSync(dest,wmTemplate.ngJsonTemplate(),'utf-8');
    }
}



