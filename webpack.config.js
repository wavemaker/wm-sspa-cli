const path = require(`path`);
const nodeExternals = require(`webpack-node-externals`);
const CopyPlugin = require(`copy-webpack-plugin`);

module.exports = {
    entry: `./index_cli.js`,
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "overwrites", to: "overwrites" }
            ],
        }),
    ],
    output: {
        path: path.resolve(__dirname,`dist`),
        filename: `wm_bundle.js`
    },
    target: `node`,
    externals: [nodeExternals()],
    mode: `production`
}