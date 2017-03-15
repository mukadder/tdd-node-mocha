/**
 * Created by mukadder on 3/15/17.
 */
/*
 One component can access another component's properties and methods using local variables. In the following example, we create a local variable for the child component that becomes accessible within the template:
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
        this.flag = false;
    }
    ChildComponent.prototype.toggle = function () {
        this.flag = !this.flag;
    };
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'child-component',
            template: "\n    <h2>Content Header</h2>\n    <p *ngIf=\"flag\">Toggleable Content</p>\n  "
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: " \n    <h1>Component Interactions</h1>\n    <button (click)=\"child.toggle()\">Toggle Child</button>\n    <child-component #child></child-component>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 We create a local variable using the # symbol.

 The method in the child component must be public, otherwise Angular will throw an exception.

 This technique is very useful in some cases because it doesn't require any code inside the component class. On the other hand, the reference context is just inside the template.

 If you need to access the child component inside the parent component, you need to inject a reference to the child component using the @ViewChild decorator.

 Consider the following example:


 */
[app.component.ts];
var core_2 = require('@angular/core');
var ChildComponent = (function () {
    function ChildComponent() {
        this.flag = false;
    }
    ChildComponent.prototype.toggle = function () {
        this.flag = !this.flag;
    };
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'child-component',
            template: "\n    <h2>Content Header</h2>\n    <p *ngIf=\"flag\">Toggleable Content</p>\n  "
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.toggle = function () {
        this.childComponent.toggle();
    };
    __decorate([
        core_2.ViewChild(ChildComponent)
    ], AppComponent.prototype, "childComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: " \n    <h1>Component Interactions</h1>\n    <button (click)=\"toggle()\">Toggle Child</button>\n    <child-component></child-component>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//The parent component is using the @ViewChild decorator (imported from angular core) passing the name of the component, and assigning it to a local class member named childComponent.
/*
If we have more than one instance of the child component, we can use the @ViewChildren decorator instead.

 Querying child components with the parent component
 The @ViewChildren component will provide a reference to all of the children components of a given type as a QueryList, which contains an array of child instances.

 Consider the following example:*/
[app.component.ts];
var core_3 = require('@angular/core');
var ChildComponent = (function () {
    function ChildComponent() {
        this.flag = false;
    }
    ChildComponent.prototype.toggle = function () {
        this.flag = !this.flag;
    };
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'child-component',
            template: "\n    <h2>Content Header</h2>\n    <p *ngIf=\"flag\">Toggleable Content</p>\n  "
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.toggle = function () {
        this.children.forEach(function (child) { return child.toggle(); });
    };
    __decorate([
        core_3.ViewChildren(ChildComponent)
    ], AppComponent.prototype, "children", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: " \n    <h1>Component Interactions</h1>\n    <button (click)=\"toggle()\">Toggle Child</button>\n    <child-component></child-component>\n    <child-component></child-component>\n    <child-component></child-component>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
