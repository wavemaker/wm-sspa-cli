const CLI = require("clui");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");

const Spinner = CLI.Spinner;
const countdown = new Spinner();
const head = chalk.cyanBright;
const text = chalk.white;
const textSub = chalk.grey;
const textHead = chalk.white.bold;
const progress = chalk.inverse;
const successHead = chalk.greenBright.bold;
const errorHead = chalk.redBright.bold;
const log = console.log;

const updateStatus = status => {
  countdown.message(` ${status}`);
};
const initStatus = () => {
  countdown.start(` Intializing ...`);
};
const endStatus = () => {
  countdown.stop();
};
const printCliHeader = () => {
  clear();
  log(
    head(
      figlet.textSync(" WaveMaker ", {
        horizontalLayout: "default",
      })
    )
  );
  log(head(` * A CLI to generate Single-spa files for WaveMaker App * `));
  log(textHead(`\n                www.wavemakeronline.com`));
  log(textHead(`\n# Usage Examples #`));
  log(
    textHead(`npx wm-sspa-cli`),
    text(` --project-path <local_project_path> --deploy-url <deploy_url>`)
  );
  log(
    textHead(`npx wm-sspa-cli`),
    text(` -p <local_project_path> -d <deploy_url>`)
  );
  log("\n");
};

const printSuccess = msg => {
  printCliHeader();
  log(successHead(`\n# SUCCESS #`));
  log(text(msg));
  log("\n");
};
const printFailure = msg => {
  printCliHeader();
  log(errorHead(`\n# FAILED #`));
  log(textSub(msg));
  log("\n");
};
const printProgress = msg => {
  log(progress(msg));
};

module.exports = {
  initStatus,
  endStatus,
  updateStatus,
  printCliHeader,
  printSuccess,
  printFailure,
  printProgress
};
