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
    <h1 [ngStyle]="{'font-size': titleSize }">{{ info.title }}</h1>
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
    titleSize: string;

    constructor() {
        this.info = {title: 'app works!'};
        this.firstName = 'Nir';
        this.lastName = 'Kaufman';
        this.showFullName = false;
        this.titleSize = '96px';
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }

    getClass(){
        return { italic: true, info: true };
    }
}
/*
 The ngStyle directive will change the inline styles of the element based on an expression that evaluates an object. In the following example, we will use ngStyle to dynamically assign a font size to the title:
 NgSwitch
 The NgSwitch directive adds or removes DOM subtrees according to the value of the switch expression. To effectively use this directive, we used ngSwitchCase and ngSwitchDefault within the ngSwitch directive block:

 <div [ngSwitch]="cases">
 <div *ngSwitchCase="1">Case 1</div>
 <div *ngSwitchCase="2">Case 2</div>
 <div *ngSwitchDefault>Default Case</div>
 </div>
 There are a few things to notice—the ngSwitch directive is not a structural directive, which means it does not use a <template> tag and also does not manipulate the DOM tree. This is done by the ngSwitchCase and the ngSwitchDefault directives. So, we use the square brackets when using the ngSwitch directive, and the asterisk for the rest.


 */