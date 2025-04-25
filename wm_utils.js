const node_path = require("path");
const getWmNgAppName = ()=> 'wm-gen-ng-proj';
const getGeneratedApp = path => node_path.resolve(`${path}/${getWmNgAppName()}`);
// const getSspaPath = path => node_path.resolve(`${path}/wm-ng-app`);
const getSspaPath = path => getGeneratedApp(path);
const getBundlePath = path => node_path.resolve(`${path}/wm-sspa-dist`);
const getPOMPath = path => node_path.resolve(`${path}/pom.xml`);

const { exec } = require("child_process");

function execCommand(command, options = {}) {
  console.log(`Running the Command - ${command}`);
  return new Promise((resolve, reject) => {
    const child = exec(command, options);
    // Stream stdout
    if (child.stdout) {
      child.stdout.on("data", (data) => {
        process.stdout.write(data);
      });
    }
    // Stream stderr
    if (child.stderr) {
      child.stderr.on("data", (data) => {
        process.stderr.write(data);
      });
    }
    // Handle exit
    child.on("close", (code) => {
      if (code === 0) {
        resolve(); // You can also resolve with { stdout, stderr } if needed
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    child.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {
  getGeneratedApp,
  getBundlePath,
  getSspaPath,
  getPOMPath,
  execCommand,
};
