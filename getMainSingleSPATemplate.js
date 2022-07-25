const mainSingleSPATemplate = `
// @ts-nocheck
import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

var imgObserver, styles = environment.styles.split(","), isMountStylesEnabled = environment.mountStyles;

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
    if(isMountStylesEnabled) {
        styles.map(function(stylesheet) {
            mountStyle(environment.sspaDeployUrl + '/' + stylesheet);    
        });
    }
}

function unmountStyles() {
    if(isMountStylesEnabled) {
        const styleSheets = document.querySelectorAll('link[href$="styles.css"]');
        styleSheets.forEach(unmountStyle);
    }
}

function mountWMAppProps(appName) {
	let wmProps = sessionStorage.getItem(appName + "-wmProps");
	if(wmProps) {
		return new Promise((resolve, reject) => {
			return resolve(JSON.parse(wmProps));
		})
	} else {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = environment.deployUrl + "/services/application/wmProperties.js";
            script.id = 'sspa-wm-script';
            script.type = 'text/javascript';
            script.async = false;
            script.charset = 'utf-8';
            script.onload = () => {
				sessionStorage.setItem(appName + "-wmProps", JSON.stringify(_WM_APP_PROPERTIES));
                return resolve(_WM_APP_PROPERTIES);
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        })
	} 
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

function addToasterObserver() {
    let observer = new MutationObserver(function(list) {
		list.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if(node.className === 'overlay-container') {
                    if(node.childNodes[0].id === 'toast-container') {
                        node.classList.add("wm-app");
                        observer.disconnect();
                    }
                }
			});
        });
    });
	observer.observe(document.body, { subtree: false, childList: true });
}

function addImgObserver(appName) {
    imgObserver = new MutationObserver(function(list) {
        list.forEach(function(mutation) {
              if (mutation.type === 'attributes') {
                  let targetEle = mutation.target, src = targetEle.getAttribute("src"), poster = targetEle.getAttribute("poster");
                  if(src.startsWith("./")) {
                    targetEle.setAttribute("src", environment.deployUrl + src.slice(1));
                  }
				  if(poster && poster.startsWith("resources")) {
                      targetEle.setAttribute("poster", environment.deployUrl + "/" + poster);
				  }
              }
        });
    });
    imgObserver.observe(document.getElementById('single-spa-application:'+appName), 
                            { attributes: true, subtree: true, childList: true , attributeFilter: ['src', 'poster']});
}

function disconnectObservers() {
    imgObserver.disconnect();	
}

function addObservers(appName) {
	addToasterObserver();
	addImgObserver(appName);
}

function unloadModule(appName) {
    if(System) {
        try {
            importMapOverrides.getDefaultMap().then((importMap) => {
                System.delete(importMap.imports[appName])
            });
        } catch(e) {
            console.error("Unloading the module for the app[" + appName + "] failed.", e);
        }
    } else {
        console.error("SystemJs not found in the global namespace. Please unload the module for the app : ", appName)
    }
}

const lifecycles = singleSpaAngular({
    bootstrapFunction: (singleSpaProps) => {
	    addObservers(singleSpaProps.name);
        singleSpaPropsSubject.next(singleSpaProps);
        return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
    },
    template: '<app-root />',
    Router,
    NavigationStart,
    NgZone,
});

export const bootstrap = [
	async (singleSpaProps) => {
        await mountWMAppProps(singleSpaProps.name).then(props => window._WM_APP_PROPERTIES = props);
    },
	lifecycles.bootstrap
];

export const mount = [
    async (singleSpaProps) => {
        mountStyles();
    },
    lifecycles.mount
]

export const unmount = [
    async (singleSpaProps) => {
        singleSpaProps.singleSpa.unloadApplication(singleSpaProps.name, {waitForUnmount: true}).then(() => {
            if(document.getElementById('single-spa-application:'+singleSpaProps.name)) {
                document.getElementById('single-spa-application:'+singleSpaProps.name).innerHTML = "";
            } else {
                console.error("App with the name[" + singleSpaProps.name+ "] not found");
            }
			disconnectObservers();
            unmountStyles();
            unmountWMAppProps();   
            unloadModule(singleSpaProps.name)
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