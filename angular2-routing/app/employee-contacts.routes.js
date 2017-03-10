"use strict";
var employee_contacts_list_component_1 = require('./employee-contacts-list.component');
var employee_contacts_detail_component_1 = require('./employee-contacts-detail.component');
exports.EmployeeContactsAppRoutes = [
    { path: '', component: employee_contacts_list_component_1.ContactsListComponent },
    { path: 'detail/:id', component: employee_contacts_detail_component_1.ContactsDetailComponent }
];
//# sourceMappingURL=employee-contacts.routes.js.map