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
var ContactsListComponent = (function () {
    function ContactsListComponent(contactsService) {
        this.contactsService = contactsService;
    }
    ContactsListComponent.prototype.ngOnInit = function () {
        this.employeeContacts = this.contactsService.getContacts();
    };
    ContactsListComponent = __decorate([
        core_1.Component({
            selector: 'employee-contacts-list',
            templateUrl: 'resource/employee-contacts-list.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [employee_contacts_service_1.ContactsService])
    ], ContactsListComponent);
    return ContactsListComponent;
}());
exports.ContactsListComponent = ContactsListComponent;
//# sourceMappingURL=employee-contacts-list.component.js.map