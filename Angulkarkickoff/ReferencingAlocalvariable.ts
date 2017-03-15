/**
 * Created by mukadder on 3/15/17.
 */
/*
 One component can access another component's properties and methods using local variables. In the following example, we create a local variable for the child component that becomes accessible within the template:
 */

[app.component.ts]
import { Component } from '@angular/core';

@Component({
    selector: 'child-component',
    template: `
    <h2>Content Header</h2>
    <p *ngIf="flag">Toggleable Content</p>
  `
})
export class ChildComponent {
    private flag: boolean = false;
    toggle() {
        this.flag = !this.flag;
    }
}

@Component({
    selector  : 'app-root',
    template  : ` 
    <h1>Component Interactions</h1>
    <button (click)="child.toggle()">Toggle Child</button>
    <child-component #child></child-component>
  `
})
export class AppComponent {}
/*
 We create a local variable using the # symbol.

 The method in the child component must be public, otherwise Angular will throw an exception.

 This technique is very useful in some cases because it doesn't require any code inside the component class. On the other hand, the reference context is just inside the template.

 If you need to access the child component inside the parent component, you need to inject a reference to the child component using the @ViewChild decorator.

 Consider the following example:


 */
[app.component.ts]
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'child-component',
    template: `
    <h2>Content Header</h2>
    <p *ngIf="flag">Toggleable Content</p>
  `
})
export class ChildComponent {
    private flag: boolean = false;
    toggle(){
        this.flag = !this.flag;
    }
}

@Component({
    selector: 'app-root',
    template: ` 
    <h1>Component Interactions</h1>
    <button (click)="toggle()">Toggle Child</button>
    <child-component></child-component>
  `
})
export class AppComponent {
    @ViewChild(ChildComponent)
    private childComponent: ChildComponent;
    toggle(){
        this.childComponent.toggle();

    }
}
//The parent component is using the @ViewChild decorator (imported from angular core) passing the name of the component, and assigning it to a local class member named childComponent.
/*
If we have more than one instance of the child component, we can use the @ViewChildren decorator instead.

 Querying child components with the parent component
 The @ViewChildren component will provide a reference to all of the children components of a given type as a QueryList, which contains an array of child instances.

 Consider the following example:*/

[app.component.ts]
import { Component, ViewChildren, QueryList } from '@angular/core';

@Component({
    selector: 'child-component',
    template: `
    <h2>Content Header</h2>
    <p *ngIf="flag">Toggleable Content</p>
  `
})
export class ChildComponent {
    private flag: boolean = false;

    toggle(){
        this.flag = !this.flag;
    }
}

@Component({
    selector: 'app-root',
    template: ` 
    <h1>Component Interactions</h1>
    <button (click)="toggle()">Toggle Child</button>
    <child-component></child-component>
    <child-component></child-component>
    <child-component></child-component>
  `
})
export class AppComponent {
    @ViewChildren(ChildComponent)
    private children: QueryList<ChildComponent>;
    toggle(){
        this.children.forEach(child => child.toggle())
    }
}
