"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**quick definition: a directive is a custom attribute that adds functionality to an element.
 * In Angular, a component is considered to be a special case of a directive which contains a template.
 * Created by mukadder on 3/15/17.
 */
[app.component.ts];
var core_1 = require('@angular/core');
//NgIf directive will remove or recreate a portion of the DOM based on an expression that we passed. The expression should evaluate to true or false.
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
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n    <h1>{{ info.title }}</h1>\n    <h2>{{ info.subtitle || 'alternative text' }}</h2>  \n    <h3 *ngIf=\"showFullName\">My name is: {{ getFullName() }}</h3> \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
