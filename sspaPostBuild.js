const sspaPostBuildScript = `
const util = require('util');
const fs = require('fs-extra');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto');
const opPath = process.cwd() + "/dist/ng-bundle";

let styleHashMap = {}; 
const copyCssFiles = (filename, hash) => {
	try {
		const updatedFilename = filename + "." + hash + ".css";
		copyFile(opPath + "/" + filename + ".css", opPath + "/" + updatedFilename);
	} catch (e) {
		console.error("File[" + filename + "] not found | ", e);
	}
};

const generateHash = async (filepath) => {
    const cssContent = await readFile(filepath);
    let hash = crypto.createHash('md5');
    hash.update(cssContent);
    return hash.digest('hex');
};

const addStyleHash = () => {
	const styleFile = fs.readdirSync(opPath).filter(file => file.startsWith("styles."))[0];
	let styleFileHash = styleFile.split(".")[1];
	styleHashMap["{styles-hash}"] = styleFileHash;
}

const replaceCssHash = async () => {
	const mainFile = fs.readdirSync(opPath).filter(file => file.startsWith("main-es2015"))[0];
	const mainContent = await readFile(opPath + "/" + mainFile);
	let content = mainContent.toString();
	for (let placeHolder in styleHashMap) {
		let hashRegex = new RegExp(placeHolder,"ig");
		content = content.replace(hashRegex, styleHashMap[placeHolder]);
	}
	fs.writeFileSync(opPath + "/" + mainFile, content);
};

(async () => {
	try {
		const cssFileNames = ['wm-theme-styles', 'wm-app-styles', 'wm-styles'];
		for(var i = 0; i < cssFileNames.length; i++  ) {
			let file = opPath + "/" + cssFileNames[i] + ".css";
			if(fs.existsSync(file)) {
				const hash = await generateHash(file);
				copyCssFiles(cssFileNames[i], hash);
				styleHashMap["{" + cssFileNames[i] + "-hash}"] = hash;
			}
		};
		addStyleHash();
		replaceCssHash();
	} catch (e) {
		console.error("Error in Post ng build Script | ", e);
	} 
})()
`;

const getSSPAPostBuildScriptTemplate = () => {
	return sspaPostBuildScript;
};

module.exports = {
	getSSPAPostBuildScriptTemplate
};

