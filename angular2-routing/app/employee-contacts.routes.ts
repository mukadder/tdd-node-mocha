import { ContactsListComponent } from './employee-contacts-list.component';
import { ContactsDetailComponent } from './employee-contacts-detail.component';

export const EmployeeContactsAppRoutes = [
  { path: '', component: ContactsListComponent },
  { path: 'detail/:id', component: ContactsDetailComponent } 
]