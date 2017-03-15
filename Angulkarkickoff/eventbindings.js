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
    }
    AppComponent.prototype.clickHandler = function () {
        console.log('button clicked!');
    };
    AppComponent = __decorate([
        /**
         * Created by mukadder on 3/15/17.
         */ Component({
            selector: 'app-root',
            template: "\n    <button (click)=\"clickHandler()\">\n      click me!</button> \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 Up until now, we learned about two kinds of data binding: interpolation (using the curly braces) and properties binding. Both of them are considered to be one-way data binding from the data source to the view. In real life, our component should be able to respond to user events. Luckily, in Angular 2, this is simple as property binding.

 We can respond to any native DOM event by surrounding it with parentheses and assign it to a method on the component class. Let's see how we can respond to the click event on our button. We need to wrap the click event of the button in parentheses, and assign a method that will be invoked in return:
 */
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            template: "    \n    <h2 (click)=\"toggeld = !toggeld \">Click me to toggle some content1</h2>\n    <p *ngIf=\"toggeld\">Toggeld content</p>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
