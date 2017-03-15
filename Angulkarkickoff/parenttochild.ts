/**
 * Created by mukadder on 3/15/17.
 */
/*
 Chapter 6. Component Communication
 Up until now, we have built a single component, but the real power of Angular components is building the interaction between them. in this chapter, we will learn how components can communicate in different ways:

 Pass data from the parent component to the child through properties
 Define custom events on a child component for the parent to listen to
 Communicate via local variables
 Query child components using the parent component
 Passing data via properties
 The parent component can pass data to the child component through properties. There are two ways that define input properties for a component:

 By creating an input array on the component decorator
 By using the @Input decorator for decorating a class property
 Using the component input array is simple and straightforward. Just declare an input array and populate it with strings that represent the name of the property you are expecting:
 */

[app.component.ts]
import { Component } from '@angular/core';

@Component({
    selector: 'child-component',
    inputs:   ['title'],
    template: `<h2>{{ title }}</h2>`
})

export class ChildComponent {}

@Component({
    selector: 'app-root',
    template: ` 
    <h1>Component Interactions</h1>
    <child-component [title]="title" ></child-component>
  `
})
export class AppComponent {
    private title: string = "Sub title for child";
}/*
 In this example, we created a child component, which defined an input array with a single string named title that represents a property that the parent component can bind to and pass data through.
 Don't forget to add the ChildComponent class to the declarations attribute of the AppModule. Otherwise, this component can't be used within the template of the AppComponent. This configuration is required each time you need to use a component or a directive in another one and within the same module:*/
//The approach of the input array is suitable when we don't need to access the input in the Component class, and we don't care about the type of the input.
 [app.module.ts]
 import { BrowserModule } from '@angular/platform-browser';
 import { NgModule } from '@angular/core';
 import { FormsModule } from '@angular/forms';
 import { HttpModule } from '@angular/http';
 import { AppComponent, ChildComponent } from './app.component';

 @NgModule({
 declarations: [
 AppComponent,
 ChildComponent
 ],
 imports: [
 BrowserModule
 ],
 providers: [],
 bootstrap: [AppComponent]
 })
 export class AppModule { }

[app.component.ts]
import { Component, Input } from '@angular/core';

@Component({
    selector: 'child-component',
    template: `<h2>{{ title }}</h2>`
})
export class ChildComponent {
    @Input() private title: string;
}

@Component({
    selector: 'app-root',
    template: ` 
    <h1>Component Interactions</h1>
    <child-component [title]="title"></child-component>
  `
})
export class AppComponent {
    private title: string = 'Sub title for child';
}