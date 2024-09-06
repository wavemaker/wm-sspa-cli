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
const checkProjectPath = async (path) => {
  if (!argv["project-path"] && !argv["p"]) {
    argv = { ...argv, ...(await inquirer.getProjectPath()) };
  } else {
    if (!inquirer.isValidPath(argv["project-path"] || argv["p"])) {
      printFailure(
          `Invalid WaveMaker project path: "${argv["project-path"] ||
          argv["p"]}"\n`
      );
      return false;
    } else {
      return true;
    }
  }
}

const checkLibraryTarget = async (path) => {
  if (!argv["library-target"] && !argv["l"]) {
    argv = { ...argv };
    return true
  } else {
    argv["l"] = argv["l"].toLowerCase();
    if(!['umd', 'system'].includes(argv['l'])) {
      printFailure(
          `Invalid value passed to library-target(-l) "${argv["library-target"] || argv["l"]}". Please check\n`
      );
      return false;
    } else {
      return true;
    }
  }
}

const checkSplitStyles = async (path) => {
  if (!argv["split-styles"] && !argv["c"]) {
    argv = { ...argv };
    return true;
  } else {
    argv["c"] = argv["c"].toLowerCase();
    if(!['true', 'false'].includes(argv['c'])) {
      printFailure(
          `Invalid value passed to split-styles(-c) "${argv["split-styles"] || argv["c"]}". Please check\n`
      );
      return false;
    } else {
      return true;
    }
  }
}

const checkMountStyles = async (path) => {
  if (!argv["mount-styles"] && !argv["m"]) {
    argv = { ...argv };
    return true;

  } else {
    argv["m"] = argv["m"].toLowerCase();
    if(!['true', 'false'].includes(argv['m'])) {
      printFailure(
          `Invalid value passed to mount-styles(-m) "${argv["mount-styles"] || argv["m"]}". Please check\n`
      );
      return false;
    } else {
      return true;
    }
  }
}

const checkResourceHashing = async (path) => {
  if (!argv["resource-hashing"] && !argv["r"]) {
    argv = { ...argv };
    return true;

  } else {
    argv["r"] = argv["r"].toLowerCase();
    if(!['true', 'false'].includes(argv['r'])) {
      printFailure(
          `Invalid value passed to resource-hashing(-r) "${argv["resource-hashing"] || argv["r"]}". Please check\n`
      );
      return false;
    } else {
      return true;
    }
  }
}

if (argv["help"] || argv["h"]) {
  printCliHeader();
} else {
  (async () => {
    if(!await checkProjectPath()) {
      return;
    }
    if(argv["portable-build"] || argv["b"]) {
      argv["b"] = (argv["portable-build"] ? argv["portable-build"].toLowerCase() : (argv["b"] ? argv["b"].toLowerCase() : 'true'));
      if(!['true', 'false'].includes(argv['b'])) {
        printFailure(
            `Invalid value passed to portable-build(-b) "${argv["portable-build"] || argv["b"]}". Please check\n`
        );
        return;
      }
    } else {
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
    }
    if(!await checkLibraryTarget()) {
      return;
    }
    if(!await checkSplitStyles()) {
      return;
    }
    if(!await checkMountStyles()) {
      return;
    }
    if(!await checkResourceHashing()) {
      return;
    }

    //portable-build - build once deploy anywhere - flag
    process.env.PORTABLE_BUILD = argv["b"] || 'false';

    process.env.VERBOSE = argv["verbose"];
    process.env.PROJECT_PATH = trimEnd(argv["project-path"] || argv["p"]);
    process.env.LIBRARY_TARGET = argv["library-target" ] || argv["l"] || 'umd';
    process.env.SPLIT_STYLES = argv["split-styles"] || argv["c"] || 'false';
    process.env.RESOURCE_HASHING = argv["resource-hashing"] || argv["r"] || 'false';
    process.env.MOUNT_STYLES = argv["mount-styles"] || argv["m"] || 'true';

    if (process.env["PORTABLE_BUILD"] !== "true") {
      process.env.DEPLOY_URL = trimEnd(argv["deploy-url"] || argv["d"] || 'http://localhost:8080');
      process.env.SSPA_DEPLOY_URL = argv["sspa-deploy-url"] || argv["s"] || 'http://localhost:8080';
    }

    printCliHeader();
    initStatus();
    try {
      await generateSspaBundle(
        process.env.PROJECT_PATH,
        process.env.DEPLOY_URL,
        process.env.SSPA_DEPLOY_URL,
        process.env.LIBRARY_TARGET,
        process.env.SPLIT_STYLES,
        process.env.RESOURCE_HASHING,
        process.env.MOUNT_STYLES,
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
