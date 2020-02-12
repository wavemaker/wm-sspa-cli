#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./inquirer");
const parseArgs = require("minimist");

const util = require("util");
const requestp = require("request-promise");
clear();
console.log(
  chalk.blue(figlet.textSync("WaveMaker", { horizontalLayout: "full" }))
);

const printCliHelp = () => {
  console.log(
    chalk.blue(
      `*       A CLI to convert WaveMaker App to Single-Spa compatible App      *`
    ),
    chalk.blue(`\n\n##### USAGE EXAMPLE #####`),
    chalk.white(
      `\n#1. <command> --project-path <FULL_PATH_OF_WM_PROJECT> --deploy-url <WM_APP_DEPLOYED_URL>`
    ),
    chalk.white(
      `\n#2. <command> -p <FULL_PATH_OF_WM_PROJECT> -d <WM_APP_DEPLOYED_URL>`
    ),
    chalk.white(`\n#3. <command> --help`),
    chalk.blueBright(`\n\nOR\n`)
  );
};
printCliHelp();
let argv = parseArgs(process.argv.slice(2));
if (argv["help"] || argv["h"]) {
  printCliHelp();
} else {
  (async () => {
    if (!argv["project-path"] && !argv["p"]) {
      argv = { ...argv, ...(await inquirer.getProjectPath()) };
      console.log(argv);
    } else if (!inquirer.isValidPath(argv["project-path"] || argv["p"])) {
      console.log(
        chalk.red(
          `ERROR | Invalid WaveMaker project path \n"${PROJECT_PATH}"\n`
        )
      );
    }
    if (!argv["deploy-url"] && !argv["d"]) {
      argv = { ...argv, ...(await inquirer.getDeployedUrl()) };
      console.log(argv);
    } else if (!(await inquirer.isValidURL(argv["deploy-url"] || argv["d"]))) {
      console.log(
        chalk.red(`ERROR | Invalid WaveMaker Deploy url \n"${PROJECT_PATH}"\n`)
      );
    }

    const PROJECT_PATH = argv["project-path"] || argv["p"];
    const DEPLOY_URL = argv["deploy-url"] || argv["d"];
    console.log(chalk.green(`### START #####`));
  })();
}
