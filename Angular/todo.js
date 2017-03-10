/**
 * Created by mukadder on 3/10/17.
 */
export class Todo {
    id: number;
    title: string = '';
    complete: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
/*In this Todo class definition, we specify that each Todo instance will have three properties:

    id: number, unique ID of the todo item
title: string, title of the todo item
complete: boolean, whether or not the todo item is complete
We also provide constructor logic that lets us specify property values during instantiation so we can easily create new Todo instances like this:

 let todo = new Todo({
 title: 'Read SitePoint article',
 complete: false
 });

 While we are at it, let’s add a unit test to make sure our constructor logic works as expected.

 When generating the Todo class, we used the --spec option. This told Angular CLI to also generate src/app/todo.spec.ts for us with a basic unit test:

 import {Todo} from './todo';

 describe('Todo', () => {
 it('should create an instance', () => {
 expect(new Todo()).toBeTruthy();
 });
 });
 The TodoDataService will be responsible for managing our Todo items.

 In another part of this series you will learn how to communicate with a REST API, but for now we will store all data in memory.

 Let’s use Angular CLI again to generate the service for us:

 import { Injectable } from '@angular/core';

 @Injectable()
 export class TodoDataService {

 constructor() { }

 }
 Let’s open up src/app/todo-data.service.ts and add our todo management logic to the TodoDataService:
 import {Injectable} from '@angular/core';
 import {Todo} from './todo';

 @Injectable()
 export class TodoDataService {

 // Placeholder for last id so we can simulate
 // automatic incrementing of id's
 lastId: number = 0;

 // Placeholder for todo's
 todos: Todo[] = [];

 constructor() {
 }

 // Simulate POST /todos
 addTodo(todo: Todo): TodoDataService {
 if (!todo.id) {
 todo.id = ++this.lastId;
 }
 this.todos.push(todo);
 return this;
 }

 // Simulate DELETE /todos/:id
 deleteTodoById(id: number): TodoDataService {
 this.todos = this.todos
 .filter(todo => todo.id !== id);
 return this;
 }

 // Simulate PUT /todos/:id
 updateTodoById(id: number, values: Object = {}): Todo {
 let todo = this.getTodoById(id);
 if (!todo) {
 return null;
 }
 Object.assign(todo, values);
 return todo;
 }

 // Simulate GET /todos
 getAllTodos(): Todo[] {
 return this.todos;
 }

 // Simulate GET /todos/:id
 getTodoById(id: number): Todo {
 return this.todos
 .filter(todo => todo.id === id)
 .pop();
 }

 // Toggle todo complete
 toggleTodoComplete(todo: Todo){
 let updatedTodo = this.updateTodoById(todo.id, {
 complete: !todo.complete
 });
 return updatedTodo;
 }

 }

 <section class="todoapp">
 <header class="header">
 <h1>Todos</h1>
 <input class="new-todo" placeholder="What needs to be done?" autofocus="" [(ngModel)]="newTodo.title" (keyup.enter)="addTodo()">
 </header>
 <section class="main" *ngIf="todos.length > 0">
 <ul class="todo-list">
 <li *ngFor="let todo of todos" [class.completed]="todo.complete">
 <div class="view">
 <input class="toggle" type="checkbox" (click)="toggleTodoComplete(todo)" [checked]="todo.complete">
 <label>{{todo.title}}</label>
 <button class="destroy" (click)="removeTodo(todo)"></button>
 </div>
 </li>
 </ul>
 </section>
 <footer class="footer" *ngIf="todos.length > 0">
 <span class="todo-count"><strong>{{todos.length}}</strong> {{todos.length == 1 ? 'item' : 'items'}} left</span>
 </footer>
 </section>

 [property]="expression": set property of an element to the value of expression
 (event)="statement": execute statement when event occurred
 [(property)]="expression": create two-way binding with expression
 [class.special]="expression": add special CSS class to element when the value of expression is truthy
 [style.color]="expression": set color CSS property to the value of expression
 [(ngModel)]="newTodo.title": adds a two-way binding between the input value and newTodo.title
 (keyup.enter)="addTodo()": tells Angular to execute addTodo() when the enter key was pressed while typing in the input element
 Don’t worry about where newTodo or addTodo() come from yet, we will get there shortly. Just try to understand the semantics of the view for now.
 Let’s see what that means for our view. At the top there is an input to create a new todo:

 <input class="new-todo" placeholder="What needs to be done?" autofocus="" [(ngModel)]="newTodo
 Next there is a section to display existing todo’s:

 <section class="main" *ngIf="todos.length > 0">
 *ngIf="todos.length > 0": only show the section element and all its children when there is at least one todo
 Within that section, we ask Angular to generate an li element for each todo:

 <li *ngFor="let todo of todos" [class.completed]="todo.complete">

 *ngFor="let todo of todos": loop over all todo’s and assign current todo to a variable called todo for each iteration
 [class.completed]="todo.complete": apply CSS class completed to li element when todo.complete is truthy
 and finally we display todo details for each individual todo:

 <div class="view">
 <input class="toggle" type="checkbox" (click)="toggleTodoComplete(todo)" [checked]="todo.complete">
 <label>{{todo.title}}</label>
 <button class="destroy" (click)="removeTodo(todo)"></button>
 </div>
 (click)="toggleTodoComplete(todo)": execute toggleTodoComplete(todo) when the checkbox is clicked
 [checked]="todo.complete": assign the value of todo.complete to the property checked of the element
 (click)="removeTodo(todo)": execute removeTodo(todo) when the destroy button is clicked
 You may wonder how expressions like addTodo() and newTodo.title can be evaluated. We haven’t defined them yet, so how does Angular know what we mean?

 That’s exactly where the expression context comes in. An expression context is a context in which expressions are evaluated. The expression context of a component is the component instance. And the component instance is an instance of the component class.

 The component class of our AppComponent is defined in src/app/app.component.ts.
 import { Component } from '@angular/core';

 @Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
 })
 export class AppComponent {
 title = 'app works!';
 }
 so we can immediately start adding our custom logic.

 We will need the TodoDataService service in our AppComponent logic, so let’s start by injecting the service in our component.

 First we import TodoDataService and specify it in the providers array of the Component decorator:
 / Import class so we can register it as dependency injection token
 import {TodoDataService} from './todo-data.service';

 @Component({
 // ...
 providers: [TodoDataService]
 })
 export class AppComponent {
 // ...
 }
 The AppComponent‘s dependency injector will now recognize the TodoDataService class as a dependency injection token and return a single instance of TodoDataService when we ask for it.

 Now that the component’s dependency injector knows what it needs to provide, we ask it to inject the TodoDataService instance in our component by specifying the dependency in the AppComponent constructor:

 // Import class so we can use it as dependency injection token in the constructor
 import {TodoDataService} from './todo-data.service';

 @Component({
 // ...
 })
 export class AppComponent {

 // Ask Angular DI system to inject the dependency
 // associated with the dependency injection token `TodoDataService`
 // and assign it to a property called `todoDataService`
 constructor(private todoDataService: TodoDataService) {
 }

 // Service is now available as this.todoDataService
 toggleTodoComplete(todo) {
 this.todoDataService.toggleTodoComplete(todo);
 }
 }
 The use of public or private on arguments in the constructor is a shorthand notation that allows us to automatically create properties with that name, so:
 class AppComponent {

 constructor(private todoDataService: TodoDataService) {
 }
 }
 is a shorthand notation for:

 class AppComponent {

 private todoDataService: TodoDataService;

 constructor(todoDataService: TodoDataService) {
 this.todoDataService = todoDataService;
 }
 }
 We can now implement all view logic by adding properties and methods to our AppComponent class:

 import {Component} from '@angular/core';
 import {Todo} from './todo';
 import {TodoDataService} from './todo-data.service';

 @Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css'],
 providers: [TodoDataService]
 })
 export class AppComponent {

 newTodo: Todo = new Todo();

 constructor(private todoDataService: TodoDataService) {
 }

 addTodo() {
 this.todoDataService.addTodo(this.newTodo);
 this.newTodo = new Todo();
 }

 toggleTodoComplete(todo) {
 this.todoDataService.toggleTodoComplete(todo);
 }

 removeTodo(todo) {
 this.todoDataService.deleteTodoById(todo.id);
 }

 get todos() {
 return this.todoDataService.getAllTodos();
 }

 }
 We first define a newTodo property and assign a new Todo() when the component class is instantiated. This is the same Todo instance specified in the two-way binding expression of [(ngModel)] in our view:

 Whenever the input value changes in the view, the value in the component instance is updated. And whenever the value in the component instance changes, the value in the input element in the view is updated.

 Next, we implement all methods we used in our view:

