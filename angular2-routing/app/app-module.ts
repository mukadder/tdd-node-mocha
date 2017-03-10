import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app-component';
import { EmployeeContactsAppRoutes } from './employee-contacts.routes';
import { ContactsDetailComponent } from './employee-contacts-detail.component';
import { ContactsListComponent } from './employee-contacts-list.component';
import { ContactsService } from './employee-contacts.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(EmployeeContactsAppRoutes)
  ],
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactsDetailComponent
  ],
    providers: [
    ContactsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

