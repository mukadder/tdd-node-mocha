/**
 * Created by mukadder on 3/15/17.
 */
///JIT example
import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
    enableProdMode();
}
//AOt exaple
platformBrowserDynamic().bootstrapModule(AppModule);

import './polyfills.ts';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModuleNgFactory } from './app/app.module.ng.factory';

if (environment.production) {
    enableProdMode();

}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);// watch this is difference

// this is the root module
[app.module.ts]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

// this is the component bootshrapped by root module
[app.component.ts]
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
}/*
[index.html]
<html>
<head>
<!-- other code related to the page head -->
</head>
<body>
<app-root>Loading...</app-root>
</body>
</html>
*/