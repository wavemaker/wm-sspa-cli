const sspaCustomWebpackTemplate = `
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
    const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options, {removeMiniCssExtract: false});
    singleSpaWebpackConfig.entry.styles = singleSpaWebpackConfig.entry.main;
    var mainjs = singleSpaWebpackConfig.entry.main;
    singleSpaWebpackConfig.entry.main = mainjs.filter(e => !e.endsWith('.css'));

    var stylescss = singleSpaWebpackConfig.entry.styles;
    singleSpaWebpackConfig.entry.styles = stylescss.filter(e => !e.endsWith('.ts'));

    return singleSpaWebpackConfig;
};
`;

const getSSPACustomWebpackTemplate = () => {
    return sspaCustomWebpackTemplate;
};

module.exports = {
    getSSPACustomWebpackTemplate
};

