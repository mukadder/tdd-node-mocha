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
var AppComponent = (function () {
    function AppComponent() {
        this.colors = ['red', 'green', 'blue'];
    }
    AppComponent = __decorate([
        /**
         * Created by mukadder on 3/15/17.
         */ Component({
            selector: 'app-root',
            template: "\n    <ul>\n      <li *ngFor=\"let color of colors\">{{ color }}</li>\n    </ul>   \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 The ngFor directive creates a new element (instantiates a new template), once per item from a collection that it repeats. If you are familiar with Angular 1, the ngFor directive is similar to the ng-repeat directive in concept, but the underneath implementation and syntax is different:

 In the following example, we are creating a list of colors by repeating each element in a string array:
 */
//propertybindings
var AppComponent = (function () {
    function AppComponent() {
        this.isDisabled = true;
    }
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            template: "\n   <button [disabled]=\"isDisabled\">You can't click me!</button>   \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var AppComponent = (function () {
    function AppComponent() {
        this.placeHolderText = 'type your password...';
        this.inputType = 'password';
    }
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            template: "\n    <input [type]=\"inputType\" [placeholder]=\"placeHolderText\">  \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
