const sspaCustomWebpackTemplate = `
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
    //removeMiniCssExtract - required to create css files separately otherwise css is moved to js by default by the sspa
    const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options, {removeMiniCssExtract: false});
    
    //separate css and js content separately. Remove css from main file
    singleSpaWebpackConfig.entry.styles = singleSpaWebpackConfig.entry.main;
    var mainjs = singleSpaWebpackConfig.entry.main;
    singleSpaWebpackConfig.entry.main = mainjs.filter(e => !e.endsWith('.css'));

    //separate css and js content separately. Remove ts from styles file
    var stylescss = singleSpaWebpackConfig.entry.styles;
    singleSpaWebpackConfig.entry.styles = stylescss.filter(e => !e.endsWith('.ts'));
    delete singleSpaWebpackConfig.output.chunkLoadingGlobal;
    return singleSpaWebpackConfig;
};
`;

const getSSPACustomWebpackTemplate = () => {
    return sspaCustomWebpackTemplate;
};

module.exports = {
    getSSPACustomWebpackTemplate
};

