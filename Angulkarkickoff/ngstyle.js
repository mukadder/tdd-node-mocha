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
        this.titleSize = '96px';
    }
    AppComponent.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    AppComponent.prototype.getClass = function () {
        return { italic: true, info: true };
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            styles: ["\n    .italic { font-style: italic}\n    .info { color: blue; }        \n  "],
            template: "\n    <h1 [ngStyle]=\"{'font-size': titleSize }\">{{ info.title }}</h1>\n    <h2 [ngClass]=\"getClass()\">\n      {{ info.subtitle || 'alternative text' }}</h2>\n                \n    <template [ngIf]=\"showFullName\">\n      <h3>My name is: {{ getFullName() }}</h3>        \n    </template>  \n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 The ngStyle directive will change the inline styles of the element based on an expression that evaluates an object. In the following example, we will use ngStyle to dynamically assign a font size to the title:
 NgSwitch
 The NgSwitch directive adds or removes DOM subtrees according to the value of the switch expression. To effectively use this directive, we used ngSwitchCase and ngSwitchDefault within the ngSwitch directive block:

 <div [ngSwitch]="cases">
 <div *ngSwitchCase="1">Case 1</div>
 <div *ngSwitchCase="2">Case 2</div>
 <div *ngSwitchDefault>Default Case</div>
 </div>
 There are a few things to notice—the ngSwitch directive is not a structural directive, which means it does not use a <template> tag and also does not manipulate the DOM tree. This is done by the ngSwitchCase and the ngSwitchDefault directives. So, we use the square brackets when using the ngSwitch directive, and the asterisk for the rest.


 */ 
