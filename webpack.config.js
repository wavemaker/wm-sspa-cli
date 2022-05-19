const path = require(`path`);
const nodeExternals = require(`webpack-node-externals`);

module.exports = {
    entry: `./index_cli.js`,
    output: {
        path: path.resolve(__dirname,`dist`),
        filename: `wm_bundle.js`
    },
    target: `node`,
    externals: [nodeExternals()],
    mode: `production`
}