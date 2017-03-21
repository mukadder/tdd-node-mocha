/**
 * Created by mukadder on 3/15/17.
 */
[accordion-tab.ts]
import { Component } from '@angular/core';

@Component({
    selector: 'accordion-tab',
    styles: [`
    .accordion-tab {
      width: 500px;
      border: 1px solid black;
      border-collapse: collapse;
    }
    .accordion-heading {
      padding: 5px;
      background-color: lightblue;
      cursor: pointer;
    }
 `],
    template: `
    <div class="accordion-tab">
      <div class="accordion-heading">Accordion Title</div>
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccordionTab {}

[app.component.ts]
import { Component } from '@angular/core';
import { AccordionTab } from './components/accordion/accordion-tab';

@Component({
    selector: 'app-root',
    template:`
    <div>
      <accordion-tab>Accordion Content</accordion-tab>
      <accordion-tab></accordion-tab>
      <accordion-tab></accordion-tab>
    </div>
  `
})
export class AppComponent {}

[app.module.ts]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AccordionTab } from './components/accordion/accordion-tab';

@NgModule({
    declarations: [
        AppComponent,
        AccordionTab
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
[accordion-tab.ts]
import { Component } from '@angular/core';

@Component({
    selector: 'accordion-tab',
    styles: [`
    .accordion-tab {
      width: 500px;
      border: 1px solid black;
      border-collapse: collapse;
    }
    .accordion-heading {
      padding: 5px;
      background-color: lightblue;
      cursor: pointer;
    }
  `],
    template: `
    <div class="accordion-tab">
      <div class="accordion-heading"
       (click)="toggleContent()">Accordion Title</div>
      <div class="accordion-body">
        <ng-content *ngIf="extended"></ng-content>
      </div>
    </div>
  `
})
export class AccordionTab {
    extended: boolean = false;
    toggleContent() {
        this.extended = !this.extended
    }
}
//We bind a method to the click event of the title that toggles a Boolean, which trigger the ngIf directive. We covered that in the previous two chapters. To test our component, let's put some dummy content in the other tabs. Open app.component.ts and update the template as follows:
[app.component.ts]
import { Component } from '@angular/core';
import { AccordionTab } from './accordion/accordion-tab.ts';

@Component({
    selector: 'app-root',
    template:`
    <div>
      <accordion-tab>Accordion Content</accordion-tab>
      <accordion-tab>Accordion Content</accordion-tab>
      <accordion-tab>Accordion Content</accordion-tab>
    </div>
  `
})
export class AppComponent {}
/*
[users.json]
    [
    {
        "id": 1,
        "name": "Jhon Darn",
        "email": "jhon@email.com",
        "birthday": "5/6/1979",
        "gender": "male",
        "status": "active",
        "role": "employee",
        "phoneNumbers": [
            "+972-123-9873",
            "+972-352-8922",
            "+972-667-2973"
        ]
    },
        (...)
            */

[accordion.ts]
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AccordionTab } from './accordion-tab';

@Component({
    selector: 'accordion',
    template: `
    <div>
      <accordion-tab *ngFor="let user of users"
                   (click)="toggle(user)"
                   [extended]="isActive(user)"
                   [title]="user.name">
                 <pre>{{ user | json }}</pre>
      </accordion-tab>
    </div>
  `
})
export class Accordion {  users;
    activeUserId = 0;

    constructor(http: Http) {
        http.get('/app/server/users.json')
            .map(result => result.json())
            .subscribe(result => this.users = result);
    }

    isActive(user) {
        return user.id === this.activeUserId;
    }

    toggle(user) {
        this.isActive(user) ?
            this.activeUserId = 0 : this.activeUserId = user.id;
    }
}
