/**
 * Created by mukadder on 3/15/17.
 */
[app.component.ts]
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styles: [`
    .italic { font-style: italic}
    .info { color: blue; } 
  `],
    template: `
    <h1>{{ info.title }}</h1>
    <h2 [ngClass]="getClass()">
      {{ info.subtitle || 'alternative text' }}</h2>
                
    <template [ngIf]="showFullName">
      <h3>My name is: {{ getFullName() }}</h3> 
    </template>  
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

    getClass(){
        return 'info italic';
    }
}
/*
 The NgClass directive, just like in Angular 1, conditionally adds and removes CSS classes. We pass an expression that can be interpreted in three different ways:

 A string that contains all the CSS classes that we want to add, delimited by space
 An array of CSS classes to be added
 An object that maps CSS classes to a Boolean value (true or false)
 Let's demonstrate the various options to use ngClass, start with a string:

 [app.component.ts]
 We apply the ngClass to the <h2> tag and pass a method that we implement on the component class. The getClass() method returns a string containing a string that includes the names of both of the CSS classes we want to append to the <h2> element. Don't worry about the square brackets that surround the ngClass directive. We will explain this syntax in a moment.

 We could implement that method in two other ways in order to achieve the same result:

 The first is by returning an array:
 getClass(){
 return ['info', 'italic'];
 }
 Returning an object:

 getClass(){
 return { italic: true, info: true };
 }
 The second is by using square brackets ( [ ] )

 */
