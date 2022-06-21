const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const { join } = require('path');
const readDir = util.promisify(fs.readdir);

const getWebAppPath = projectPath => `${projectPath}/src/main/webapp`;
const getPrefabsDirPath = projectPath => `${getWebAppPath(projectPath)}/WEB-INF/prefabs`;

const getPrefabsUsedInApp = async (projectPath) => {
    let prefabsUsedInProject = [];
    const path = getPrefabsDirPath(projectPath);
    return stat(path)
        .then(() => {
            return new Promise(async (res, rej) => {
                for (const dir of await readDir(path)) {
                    if ((await stat(join(path, dir))).isDirectory()) {
                        prefabsUsedInProject.push(dir);
                    }
                }
                res(prefabsUsedInProject);
            });
        }, () => Promise.resolve(prefabsUsedInProject))
};

module.exports = {
    getPrefabsUsedInApp,
};
