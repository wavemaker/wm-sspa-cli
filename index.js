#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./inquirer");
const parseArgs = require("minimist");

const wmsspaGenerator = require("./wm_index");
clear();


const printCliHelp = () => {
  console.log(
    chalk.blue(figlet.textSync("WaveMaker", { horizontalLayout: "full" }))
  ),
  console.log(
    chalk.blue(
      `*       A CLI to convert WaveMaker App to Single-Spa compatible App      *`
    ),
    chalk.blue(`\n\n##### OTHER USAGE EXAMPLES #####`),
    chalk.white(
      `\n# npx wm-sspa-cli --project-path <path> --deploy-url <url>`
    ),
    chalk.white(
      `\n# npx wm-sspa-cli -p <path> -d <url>`
    ),
    chalk.white(`\n# npx wm-sspa-cli --help\n\n`),
    
  );
};
const trimEnd = path => path.slice(-1) === "/" ? path.slice(0, -1) : path;

printCliHelp();

let argv = parseArgs(process.argv.slice(2));
if (argv["help"] || argv["h"]) {
  printCliHelp();
} else {
  (async () => {
    
    if (!argv["project-path"] && !argv["p"]) {
      argv = { ...argv, ...(await inquirer.getProjectPath()) };
    } else if (!inquirer.isValidPath(argv["project-path"] || argv["p"])) {
      console.log(
        chalk.red(
          `ERROR | Invalid WaveMaker project path \n"${argv["project-path"] ||
            argv["p"]}"\n`
        )
      );
      return;
    }
    if (!argv["deploy-url"] && !argv["d"]) {
      argv = { ...argv, ...(await inquirer.getDeployedUrl()) };
    } else if (!(await inquirer.isValidURL(argv["deploy-url"] || argv["d"]))) {
      console.log(
        chalk.red(
          `ERROR | Invalid WaveMaker Deploy url \n"${argv["deploy-url"] ||
            argv["d"]}"\n`
        )
      );
      return;
    }
    
    
    process.env.VERBOSE = argv["verbose"];
    process.env.PROJECT_PATH = trimEnd(argv["project-path"]||argv["p"]);
    process.env.DEPLOY_URL = trimEnd(argv["deploy-url"] || argv["d"]);
    
    clear();
    printCliHelp();
    
    await wmsspaGenerator.generateSspaBundle(
      process.env.PROJECT_PATH,
      process.env.DEPLOY_URL,
      process.env.VERBOSE
    );
    
  })();
}
