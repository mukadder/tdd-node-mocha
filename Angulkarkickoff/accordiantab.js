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
[accordion - tab.ts];
var core_1 = require('@angular/core');
var AccordionTab = (function () {
    function AccordionTab() {
    }
    AccordionTab = __decorate([
        core_1.Component({
            selector: 'accordion-tab',
            styles: ["\n    .accordion-tab {\n      width: 500px;\n      border: 1px solid black;\n      border-collapse: collapse;\n    }\n    .accordion-heading {\n      padding: 5px;\n      background-color: lightblue;\n      cursor: pointer;\n    }\n "],
            template: "\n    <div class=\"accordion-tab\">\n      <div class=\"accordion-heading\">Accordion Title</div>\n      <div>\n        <ng-content></ng-content>\n      </div>\n    </div>\n  "
        })
    ], AccordionTab);
    return AccordionTab;
}());
exports.AccordionTab = AccordionTab;
[app.component.ts];
var accordion_tab_1 = require('./components/accordion/accordion-tab');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n    <div>\n      <accordion-tab>Accordion Content</accordion-tab>\n      <accordion-tab></accordion-tab>\n      <accordion-tab></accordion-tab>\n    </div>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
[app.module.ts];
var platform_browser_1 = require('@angular/platform-browser');
var core_2 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            declarations: [
                app_component_1.AppComponent,
                accordion_tab_1.AccordionTab
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
[accordion - tab.ts];
var AccordionTab = (function () {
    function AccordionTab() {
        this.extended = false;
    }
    AccordionTab.prototype.toggleContent = function () {
        this.extended = !this.extended;
    };
    AccordionTab = __decorate([
        core_1.Component({
            selector: 'accordion-tab',
            styles: ["\n    .accordion-tab {\n      width: 500px;\n      border: 1px solid black;\n      border-collapse: collapse;\n    }\n    .accordion-heading {\n      padding: 5px;\n      background-color: lightblue;\n      cursor: pointer;\n    }\n  "],
            template: "\n    <div class=\"accordion-tab\">\n      <div class=\"accordion-heading\"\n       (click)=\"toggleContent()\">Accordion Title</div>\n      <div class=\"accordion-body\">\n        <ng-content *ngIf=\"extended\"></ng-content>\n      </div>\n    </div>\n  "
        })
    ], AccordionTab);
    return AccordionTab;
}());
exports.AccordionTab = AccordionTab;
//We bind a method to the click event of the title that toggles a Boolean, which trigger the ngIf directive. We covered that in the previous two chapters. To test our component, let's put some dummy content in the other tabs. Open app.component.ts and update the template as follows:
[app.component.ts];
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n    <div>\n      <accordion-tab>Accordion Content</accordion-tab>\n      <accordion-tab>Accordion Content</accordion-tab>\n      <accordion-tab>Accordion Content</accordion-tab>\n    </div>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
[users.json]
    [
    {
        "id": 1,
        "name": "Jhon Darn",
        "email": "jhon@email.com",
        "birthday": "5/6/1979",
        "gender": "male",
        "status": "active",
        "role": "employee",
        "phoneNumbers": [
            "+972-123-9873",
            "+972-352-8922",
            "+972-667-2973"
        ]
    },
        (...)
            */
[accordion.ts];
require('rxjs/add/operator/map');
var Accordion = (function () {
    function Accordion(http) {
        var _this = this;
        this.activeUserId = 0;
        http.get('/app/server/users.json')
            .map(function (result) { return result.json(); })
            .subscribe(function (result) { return _this.users = result; });
    }
    Accordion.prototype.isActive = function (user) {
        return user.id === this.activeUserId;
    };
    Accordion.prototype.toggle = function (user) {
        this.isActive(user) ?
            this.activeUserId = 0 : this.activeUserId = user.id;
    };
    Accordion = __decorate([
        core_1.Component({
            selector: 'accordion',
            template: "\n    <div>\n      <accordion-tab *ngFor=\"let user of users\"\n                   (click)=\"toggle(user)\"\n                   [extended]=\"isActive(user)\"\n                   [title]=\"user.name\">\n                 <pre>{{ user | json }}</pre>\n      </accordion-tab>\n    </div>\n  "
        })
    ], Accordion);
    return Accordion;
}());
exports.Accordion = Accordion;
