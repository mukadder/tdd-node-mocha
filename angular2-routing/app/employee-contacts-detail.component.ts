import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from './employee-contacts.service';
import { EmployeeContact } from './employee-contact.model';

@Component({
  selector: 'employee-contacts-detail',
  templateUrl: 'resource/employee-contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit { 

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) {
    
  }
  
  ngOnInit() {
    this.contact = this.contactsService.getContact(this.route.snapshot.params.id);
  }
}