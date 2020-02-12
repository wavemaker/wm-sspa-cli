
module.exports = {
    appModuleContent: `import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule as NgCommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import {
    AppComponent,
    AppJSProvider,
    AppVariablesProvider,
    ComponentRefProvider,
    PartialRefProvider,
    PrefabConfigProvider,
    WM_MODULES_FOR_ROOT,
    REQUIRED_MODULES_FOR_DYNAMIC_COMPONENTS
} from '@wm/runtime/base';


// import { routes } from './app.routes';
import { routes } from './sspa_app.routes';

import { AppJSProviderService } from '../framework/services/app-js-provider.service';
import { AppVariablesProviderService } from '../framework/services/app-variables-provider.service';
import { ComponentRefProviderService } from '../framework/services/component-ref-provider.service';
import { PrefabConfigProviderService } from '../framework/services/prefab-config-provider.service';
import { AppCodeGenModule, xsrfHeaderName } from './app-codegen.module';
import { LazyLoadScriptsResolve } from './lazy-load-scripts.resolve';
import { initPrefabConfig } from './prefabs/prefab-config';
import { Observable } from 'rxjs';

export const modalModule = ModalModule.forRoot();
export const routerModule = RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'top'});
export const toastrModule = ToastNoAnimationModule.forRoot({maxOpened: 1, autoDismiss: true });
export const bsDatePickerModule: ModuleWithProviders = BsDatepickerModule.forRoot();
export const httpClientXsrfModule = HttpClientXsrfModule.withOptions({
    cookieName: 'wm_xsrf_token',
    headerName: xsrfHeaderName
});

export const ngCircleProgressModule: ModuleWithProviders = NgCircleProgressModule.forRoot({});


export const isPrefabInitialized = initPrefabConfig();

@NgModule({
    imports:[RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration:'top'})],
    exports:[RouterModule],
    providers:[{provide:APP_BASE_HREF, useValue:"/"}]
})
export class AppRoutingModule{};

@Injectable()
export class WMInterceptor implements HttpInterceptor {
    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        // const baseUrl = 'http://localhost:8080/wmapp/';
        return next.handle(request.clone({url:`${deployUrl}${request.url}`}))
    }
}

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        NgCommonModule,
        HttpClientModule,
        AppRoutingModule,
        modalModule,
        ngCircleProgressModule,
        toastrModule,
        httpClientXsrfModule,
        bsDatePickerModule,
        WM_MODULES_FOR_ROOT,
        AppCodeGenModule,
        {{PAGE_REPLACE_MODULE}}
    ],
    providers: [
        {provide: AppJSProvider, useClass: AppJSProviderService},
        {provide: AppVariablesProvider, useClass: AppVariablesProviderService},
        {provide: ComponentRefProvider, useClass: ComponentRefProviderService},
        {provide: PartialRefProvider, useClass: ComponentRefProviderService},
        {provide: PrefabConfigProvider, useClass: PrefabConfigProviderService},
        {provide: HTTP_INTERCEPTORS, useClass:WMInterceptor, multi: true},
        LazyLoadScriptsResolve
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}`
}
