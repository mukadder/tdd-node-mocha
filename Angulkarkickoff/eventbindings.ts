/**
 * Created by mukadder on 3/15/17.
 */
@Component({
    selector: 'app-root',
    template: `
    <button (click)="clickHandler()">
      click me!</button> 
  `
})
export class AppComponent {
    clickHandler() {
        console.log('button clicked!');
    }
}
/*
 Up until now, we learned about two kinds of data binding: interpolation (using the curly braces) and properties binding. Both of them are considered to be one-way data binding from the data source to the view. In real life, our component should be able to respond to user events. Luckily, in Angular 2, this is simple as property binding.

 We can respond to any native DOM event by surrounding it with parentheses and assign it to a method on the component class. Let's see how we can respond to the click event on our button. We need to wrap the click event of the button in parentheses, and assign a method that will be invoked in return:
 */
@Component({
    selector: 'app-root',
    template: `    
    <h2 (click)="toggeld = !toggeld ">Click me to toggle some content1</h2>
    <p *ngIf="toggeld">Toggeld content</p>
  `
})
export class AppComponent {}