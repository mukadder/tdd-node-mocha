/**quick definition: a directive is a custom attribute that adds functionality to an element.
 * In Angular, a component is considered to be a special case of a directive which contains a template.
 * Created by mukadder on 3/15/17.
 */
[app.component.ts]
import { Component } from '@angular/core';
//NgIf directive will remove or recreate a portion of the DOM based on an expression that we passed. The expression should evaluate to true or false.
@Component({
    selector: 'app-root',
    template: `
    <h1>{{ info.title }}</h1>
    <h2>{{ info.subtitle || 'alternative text' }}</h2>  
    <h3 *ngIf="showFullName">My name is: {{ getFullName() }}</h3> 
  `
})
export class AppComponent {
    info: {};
    firstName: string;
    lastName: string;
    showFullName: boolean;

    constructor() {
        this.info = {title: 'app works!'};
        this.firstName = 'Nir';
        this.lastName = 'Kaufman';
        this.showFullName = false;
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}