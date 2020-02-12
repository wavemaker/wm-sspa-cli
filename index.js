#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./inquirer");
const parseArgs = require("minimist");
clear();
console.log(
  chalk.blueBright(figlet.textSync("WaveMaker", { horizontalLayout: "full" }))
);
const printCliHelp = () => {
  console.log(
    chalk.blueBright(
      `*       A CLI to convert WaveMaker App to Single-Spa compatible App      *`
    ),
    chalk.blueBright(`\n\n##### USAGE EXAMPLE #####`),
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
const argv = parseArgs(process.argv.slice(2));
if (argv["help"] || argv["h"]) {
  printCliHelp();
} else {
  (async () => {
    if (!argv["project-path"] && !argv["p"]) {
      console.log(await inquirer.getProjectPath());
    }
    if (!argv["deploy-url"] && !argv["d"]) {
      console.log(await inquirer.getDeployedUrl());
    }
  })();
}
