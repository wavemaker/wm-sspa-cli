const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const isValidPath = (pValue)=>{
    return pValue.length && fs.existsSync(path.resolve(pValue))
};
const isValidURL = (pValue)=>{
    return pValue.length && true;
};
module.exports = {
    isValidPath,
    isValidURL,
    getProjectPath: ()=>{
        const questions = [
            {
                name:'project-path',
                type: 'input',
                message: 'Enter the full path to WaveMaker Project',
                validate: function(val){
                    return isValidPath(val) || 'Please enter the path to WaveMaker Project'
                }
            }
        ];

        return inquirer.prompt(questions);
    },
    getDeployedUrl: ()=>{
        const questions = [
            {
                name:'deploy-url',
                type:'input',
                message: 'Enter the Deployed URL of the App',
                validate: function(val){
                    return isValidURL(val) || 'Please enter URL of the app'
                }
            }
        ];

        return inquirer.prompt(questions);

    }
}