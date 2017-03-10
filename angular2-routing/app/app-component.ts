import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ContactsListComponent } from './employee-contacts-list.component';
import { ContactsService } from './employee-contacts.service';
 
@Component({
  selector: 'my-routing-app',
  templateUrl: 'resource/app-component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ContactsService]
})

export class AppComponent { 
	heading = "Employee Details App";
}