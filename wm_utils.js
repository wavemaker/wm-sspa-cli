const getGeneratedApp = path => `${path}/generated-angular-app`;
const getSspaPath = path => `${path}/wm-ng-app`;
const getBundlePath = path => `${path}/wm-sspa-dist`;
module.exports = {
  getGeneratedApp,
  getBundlePath,
  getSspaPath
};
