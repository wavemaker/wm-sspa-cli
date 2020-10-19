# @wavemaker/wm-sspa-cli

## Setup
* Clone the repo locally
* Open terminal at the repository folder and execute `npm install` inside the project folder.

## Build
* The project is configured with `webpack` for building the artefacts for both local execution & publish.
* Refer [**`webpack.config.js`**](./webpack.config.js) for details.
* Hence for any change, the project needs to be built before testing.
* Execute `npm run build` for building the project

## Local Execution
* As updated earlier, the code needs to be built before running.
* Execute `npm run start` to build & run the CLI locally.

## Publish
* Ensure the project is built & has no errors
* Ensure the `version` in [**`package.json`**](./package.json) is updated as per the changes done compared to previous published version.
* Execute `npm login` in the terminal & login as authorized user
* Execute `npm publish --access public` to publish to npm registry.