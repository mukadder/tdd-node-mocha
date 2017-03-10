"use strict";
var ContactsService = (function () {
    function ContactsService() {
        this.employees = [
            { name: 'Mohit Jain', id: 123 },
            { name: 'Aparajita Jain', id: 223 },
            { name: 'Ram Singh', id: 323 },
            { name: 'Ming Lee', id: 423 },
            { name: 'Donald Trump', id: 523 },
            { name: 'Rahul Modi', id: 623 }
        ];
    }
    ContactsService.prototype.getContacts = function () {
        return this.employees;
    };
    ContactsService.prototype.getContact = function (id) {
        return this.employees.find(function (employeeContact) { return employeeContact.id == id; });
    };
    return ContactsService;
}());
exports.ContactsService = ContactsService;
//# sourceMappingURL=employee-contacts.service.js.map