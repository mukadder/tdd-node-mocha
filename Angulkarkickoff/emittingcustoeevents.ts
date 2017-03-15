/**
 * Created by mukadder on 3/15/17.
 */
/*
 Emitting custom events
 When the child component needs to communicate with its parent component, it can emit an event. This technique keeps the child component de-coupled from its parent (de-coupled: doesn't need to know its parents).

 In Angular, we need to use a class named EventEmitter if we want to emit events.

 You need to instantiate the EventEmitter class, assign it to a class property, and call the emit method.

 In the following example, the child component will emit a custom event named TitleClicked when the user clicks on the title:
 */

[app.component.ts]
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'child-component',
    template: `<h2 (click)="titleClicked.emit()">{{ title }}</h2>`
})
export class ChildComponent {
    @Input() private title: string;
    @Output() private titleClicked = new EventEmitter<any>();
}

@Component({
    selector: 'app-root',
    template: ` 
    <h1>Component Interactions</h1>
    <child-component [title]="title" 
    (titleClicked)="clickHandler()"></child-component>
  `
})
export class AppComponent {
    private title: string = 'Sub title for child';
    clickHandler() {
        console.log('Clicked!');
    }
}
/*
 First, we imported the EventEmitter class and the Output decorator from Angular core. Then, we created a class property named titleClicked and assigned it to a fresh instance of the EventEmitter class.

 Then, we bound the native click event of the <h2> element and called the emit() method of the titleClicked object.

 The parent component can now bind to this event.
 */