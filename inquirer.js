const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const request = require("request");
const requestp = require("request-promise");

/*
SAMPLE PATH
/Users/subodhk/Downloads/wspa_xp2
SAMPLE URL
http://pknl3nkxj9kt.cloud.wavemakeronline.com/wspa/services/application/wmProperties.jsRL

 */
const isValidPath = pValue => {
    pValue = pValue.slice(-1)==='/'?pValue.slice(0,-1):pValue;
  return (
    pValue.length 
    && fs.existsSync(path.resolve(pValue, "./build.xml")) 
    && fs.existsSync(path.resolve(pValue, "./src/main/webapp/")) 
  );
};

const isValidURLString = async (urlString) => {
    var res = urlString.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/g);
    return (res !== null)
};

const isValidURL = async pValue => {
  pValue = pValue.slice(-1)==='/'?pValue.slice(0,-1):pValue;
  const validURL = pValue + "/services/application/wmProperties.js";
  return new Promise((resolve, reject) => {
    requestp(validURL)
      .then(result => {
        resolve(true);
      })
      .catch(err => {
        resolve(false);
      });
  });
};
module.exports = {
  isValidPath,
  isValidURL,
  getProjectPath: () => {
    const questions = [
      {
        name: "project-path",
        type: "input",
        message: "Enter the WaveMaker Project Location\n",
        validate: function(val) {
          return (
            isValidPath(val) || "Please enter valid WaveMaker project location"
          );
        }
      }
    ];

    return inquirer.prompt(questions);
  },
  getDeployedUrl: () => {
    const questions = [
      {
        name: "deploy-url",
        type: "input",
        message: "Enter the Deployed URL of the App\n",
        validate: async function(val) {
          return (await isValidURL(val)) || "Please enter valid deployed urlWaveMaker project";
        }
      }
    ];

    return inquirer.prompt(questions);
  },
  getSSPADeployedUrl: () => {
    const questions = [
      {
        name: "sspa-deploy-url",
        type: "input",
        message: "Enter the SSPA Deployed URL of the App\n",
        validate: async function(val) {
          return (await isValidURLString(val)) || "Please enter valid deployed SSPA url project";
        }
      }
    ];

    return inquirer.prompt(questions);
  }
};
