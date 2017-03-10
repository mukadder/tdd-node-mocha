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
var employee_contacts_service_1 = require('./employee-contacts.service');
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
            selector: 'employee-contacts-detail',
            templateUrl: 'resource/employee-contacts-detail.component.html'
        }), 
        __metadata('design:paramtypes', [employee_contacts_service_1.ContactsService, (typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object])
    ], ContactsDetailComponent);
    return ContactsDetailComponent;
    var _a;
}());
exports.ContactsDetailComponent = ContactsDetailComponent;
//# sourceMappingURL=employee-contacts-detail.component.js.map