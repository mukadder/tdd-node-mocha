/**
 * Created by mukadder on 3/15/17.
 */
/*
 Emitting custom events
 When the child component needs to communicate with its parent component, it can emit an event. This technique keeps the child component de-coupled from its parent (de-coupled: doesn't need to know its parents).

 In Angular, we need to use a class named EventEmitter if we want to emit events.

 You need to instantiate the EventEmitter class, assign it to a class property, and call the emit method.

 In the following example, the child component will emit a custom event named TitleClicked when the user clicks on the title:
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
        this.titleClicked = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], ChildComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], ChildComponent.prototype, "titleClicked", void 0);
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'child-component',
            template: "<h2 (click)=\"titleClicked.emit()\">{{ title }}</h2>"
        })
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Sub title for child';
    }
    AppComponent.prototype.clickHandler = function () {
        console.log('Clicked!');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: " \n    <h1>Component Interactions</h1>\n    <child-component [title]=\"title\" \n    (titleClicked)=\"clickHandler()\"></child-component>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 First, we imported the EventEmitter class and the Output decorator from Angular core. Then, we created a class property named titleClicked and assigned it to a fresh instance of the EventEmitter class.

 Then, we bound the native click event of the <h2> element and called the emit() method of the titleClicked object.

 The parent component can now bind to this event.
 */ 
