import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ContactsService } from './employee-contacts.service';
import { EmployeeContact } from './employee-contact.model';

@Component({
  selector: 'employee-contacts-list',
  templateUrl: 'resource/employee-contacts-list.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class ContactsListComponent implements OnInit {
  
  employeeContacts: EmployeeContact[];

  constructor(private contactsService: ContactsService) {
    
  }
  
  ngOnInit() {
    this.employeeContacts = this.contactsService.getContacts();
  }
}