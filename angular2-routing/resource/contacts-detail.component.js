"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var contacts_service_1 = require('./contacts.service');
var ContactsDetailComponent = (function () {
    function ContactsDetailComponent(contactsService, route) {
        this.contactsService = contactsService;
        this.route = route;
    }
    ContactsDetailComponent.prototype.ngOnInit = function () {
        this.contact = this.contactsService.getContact(this.route.snapshot.params.id);
    };
    ContactsDetailComponent = __decorate([
        core_1.Component({
            selector: 'contacts-detail',
            template: "\n    <h2>{{contact.name}}</h2>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof contacts_service_1.ContactsService !== 'undefined' && contacts_service_1.ContactsService) === 'function' && _a) || Object, router_1.ActivatedRoute])
    ], ContactsDetailComponent);
    return ContactsDetailComponent;
    var _a;
}());
exports.ContactsDetailComponent = ContactsDetailComponent;
//# sourceMappingURL=contacts-detail.component.js.map