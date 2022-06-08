const mainSingleSPATemplate = `
// @ts-nocheck
import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

window._WM_APP_PROPERTIES = {
    "supportedLanguages" : {
        "en" : {
            "angular" : "en",
            "fullCalendar" : null,
            "moment" : null
        }
    },
};

var appName, singleSpa;

if (environment.production) {
    enableProdMode();
}

function mountStyle(styleSheetUrl) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = styleSheetUrl;
    link.media = 'all';
    head.appendChild(link);
}

function unmountStyle(styleSheet) {
    styleSheet.disabled = true;
    styleSheet.parentNode.removeChild(styleSheet);
}

function mountStyles() {
    const styleSheetUrls = [environment.sspaDeployUrl + '/styles.css', environment.sspaDeployUrl + '/wm-styles.css'];
    styleSheetUrls.forEach(mountStyle);
}

function unmountStyles() {
    const styleSheets = document.querySelectorAll('link[href$="styles.css"]');
    styleSheets.forEach(unmountStyle);
}

function mountWMAppProps() {
    let node = document.createElement('script');
    node.src = environment.wmPropsFile;
    node.id = 'sspa-wm-script';
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}

function unmountWMAppProps() {
    if(window[_WM_APP_PROPERTIES]) {
        window[_WM_APP_PROPERTIES] = null
    }

    var head = document.getElementsByTagName('head')[0];
    var script = document.getElementById('sspa-wm-script');
    if (script != null) {
        head.removeChild(script);
    }
}

const lifecycles = singleSpaAngular({
    bootstrapFunction: singleSpaProps => {
        appName = singleSpaProps.name;
        singleSpa = singleSpaProps.singleSpa;
        singleSpaPropsSubject.next(singleSpaProps);
        return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
    },
    template: '<app-root />',
    Router,
    NavigationStart,
    NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = [
    async () => {
        mountStyles();
        mountWMAppProps();
    },
    lifecycles.mount
]

export const unmount = [
    async () => {
        singleSpa.unloadApplication(appName, {waitForUnmount: true}).then(() => {
            if(document.getElementById('single-spa-application:'+appName)) {
                document.getElementById('single-spa-application:'+appName).innerHTML = "";
            } else {
                console.error("App with the name[" + appName+ "] not found");
            }
            unmountStyles();
            unmountWMAppProps();   
        })
    },
    lifecycles.unmount
]
`;

const getMainSingleSPATemplate = () => {
    return mainSingleSPATemplate;
};

module.exports = {
    getMainSingleSPATemplate
};