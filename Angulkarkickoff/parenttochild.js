/**
 * Created by mukadder on 3/15/17.
 */
/*
 Chapter 6. Component Communication
 Up until now, we have built a single component, but the real power of Angular components is building the interaction between them. in this chapter, we will learn how components can communicate in different ways:

 Pass data from the parent component to the child through properties
 Define custom events on a child component for the parent to listen to
 Communicate via local variables
 Query child components using the parent component
 Passing data via properties
 The parent component can pass data to the child component through properties. There are two ways that define input properties for a component:

 By creating an input array on the component decorator
 By using the @Input decorator for decorating a class property
 Using the component input array is simple and straightforward. Just declare an input array and populate it with strings that represent the name of the property you are expecting:
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
[app.component.ts];
var core_1 = require('@angular/core');
var ChildComponent = (function () {
    function ChildComponent() {
    }
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'child-component',
            inputs: ['title'],
            template: "<h2>{{ title }}</h2>"
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
var AppComponent = (function () {
    function AppComponent() {
        this.title = "Sub title for child";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: " \n    <h1>Component Interactions</h1>\n    <child-component [title]=\"title\" ></child-component>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent; /*
 In this example, we created a child component, which defined an input array with a single string named title that represents a property that the parent component can bind to and pass data through.
 Don't forget to add the ChildComponent class to the declarations attribute of the AppModule. Otherwise, this component can't be used within the template of the AppComponent. This configuration is required each time you need to use a component or a directive in another one and within the same module:*/
//The approach of the input array is suitable when we don't need to access the input in the Component class, and we don't care about the type of the input.
[app.module.ts];
var platform_browser_1 = require('@angular/platform-browser');
var core_2 = require('@angular/core');
var app_component_1 = require('./app.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            declarations: [
                app_component_1.AppComponent,
                app_component_1.ChildComponent
            ],
            imports: [
                platform_browser_1.BrowserModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
[app.component.ts];
var core_3 = require('@angular/core');
var ChildComponent = (function () {
    function ChildComponent() {
    }
    __decorate([
        core_3.Input()
    ], ChildComponent.prototype, "title", void 0);
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'child-component',
            template: "<h2>{{ title }}</h2>"
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Sub title for child';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: " \n    <h1>Component Interactions</h1>\n    <child-component [title]=\"title\"></child-component>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
