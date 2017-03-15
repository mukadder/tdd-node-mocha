"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by mukadder on 3/15/17.
 */
[app.component.ts];
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.info = { title: 'app works!' };
        this.firstName = 'Nir';
        this.lastName = 'Kaufman';
        this.showFullName = false;
    }
    AppComponent.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    AppComponent.prototype.getClass = function () {
        return 'info italic';
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            styles: ["\n    .italic { font-style: italic}\n    .info { color: blue; } \n  "],
            template: "\n    <h1>{{ info.title }}</h1>\n    <h2 [ngClass]=\"getClass()\">\n      {{ info.subtitle || 'alternative text' }}</h2>\n                \n    <template [ngIf]=\"showFullName\">\n      <h3>My name is: {{ getFullName() }}</h3> \n    </template>  \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 The NgClass directive, just like in Angular 1, conditionally adds and removes CSS classes. We pass an expression that can be interpreted in three different ways:

 A string that contains all the CSS classes that we want to add, delimited by space
 An array of CSS classes to be added
 An object that maps CSS classes to a Boolean value (true or false)
 Let's demonstrate the various options to use ngClass, start with a string:

 [app.component.ts]
 We apply the ngClass to the <h2> tag and pass a method that we implement on the component class. The getClass() method returns a string containing a string that includes the names of both of the CSS classes we want to append to the <h2> element. Don't worry about the square brackets that surround the ngClass directive. We will explain this syntax in a moment.

 We could implement that method in two other ways in order to achieve the same result:

 The first is by returning an array:
 getClass(){
 return ['info', 'italic'];
 }
 Returning an object:

 getClass(){
 return { italic: true, info: true };
 }
 The second is by using square brackets ( [ ] )

 */
