const inquirer = require("./inquirer");
const parseArgs = require("minimist");
const {
  initStatus,
  endStatus,
  printCliHeader,
  printFailure
} = require("./wm_cli_util");
const { generateSspaBundle } = require("./wm_index");

/*
 * CLUI Settings
 */

printCliHeader();
const trimEnd = path => (path.slice(-1) === "/" ? path.slice(0, -1) : path);
let argv = parseArgs(process.argv.slice(2));
if(argv["keep"] || argv["k"]){
  process.env.KEEP_SSPA_PROJ = true;
}
if (argv["help"] || argv["h"]) {
  printCliHeader();
} else {
  (async () => {
    if (!argv["project-path"] && !argv["p"]) {
      argv = { ...argv, ...(await inquirer.getProjectPath()) };
    } else if (!inquirer.isValidPath(argv["project-path"] || argv["p"])) {
      printFailure(
        `Invalid WaveMaker project path: "${argv["project-path"] ||
          argv["p"]}"\n`
      );
      return;
    }
    if (!argv["deploy-url"] && !argv["d"]) {
      argv = { ...argv, ...(await inquirer.getDeployedUrl()) };
    } else if (!(await inquirer.isValidURL(argv["deploy-url"] || argv["d"]))) {
      printFailure(
        `Invalid WaveMaker Deploy url:"${argv["deploy-url"] || argv["d"]}"\n`
      );
      return;
    }
    if (!argv["sspa-deploy-url"] && !argv["s"]) {
      argv = { ...argv, ...(await inquirer.getSSPADeployedUrl()) };
    } else if (!argv["s"]) {
      printFailure(
        `Invalid SSPA Deploy url:"${argv["sspa-deploy-url"] || argv["s"]}"\n`
      );
      return;
    }
    if (!argv["library-target"] && !argv["l"]) {
        argv = { ...argv};
    }

    process.env.VERBOSE = argv["verbose"];
    process.env.PROJECT_PATH = trimEnd(argv["project-path"] || argv["p"]);
    process.env.DEPLOY_URL = trimEnd(argv["deploy-url"] || argv["d"] || 'http://localhost:8080');
    process.env.LIBRARY_TARGET = trimEnd(argv["library-target"] || argv["l"] || 'umd');
    process.env.SSPA_DEPLOY_URL = (argv["sspa-deploy-url"] || argv["s"] || '');
    printCliHeader();
    initStatus();
    try {
      await generateSspaBundle(
        process.env.PROJECT_PATH,
        process.env.DEPLOY_URL,
        process.env.SSPA_DEPLOY_URL,
        process.env.LIBRARY_TARGET,
        process.env.VERBOSE
      );
    } catch (e) {
      printFailure(e);
    } finally {
      endStatus();
      process.exit(0);
    }
  })();
}
