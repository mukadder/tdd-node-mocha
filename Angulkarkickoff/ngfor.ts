/**
 * Created by mukadder on 3/15/17.
 */
@Component({
    selector: 'app-root',
    template: `
    <ul>
      <li *ngFor="let color of colors">{{ color }}</li>
    </ul>   
  `
})
export class AppComponent {
    colors: string[] = ['red', 'green', 'blue'];
}
/*
 The ngFor directive creates a new element (instantiates a new template), once per item from a collection that it repeats. If you are familiar with Angular 1, the ngFor directive is similar to the ng-repeat directive in concept, but the underneath implementation and syntax is different:

 In the following example, we are creating a list of colors by repeating each element in a string array:
 */

//propertybindings


@Component({
    selector: 'app-root',
    template: `
   <button [disabled]="isDisabled">You can't click me!</button>   
  `
})
export class AppComponent {
    private isDisabled: boolean;

    constructor() {
        this.isDisabled = true;
    }
}

@Component({
    selector: 'app-root',
    template: `
    <input [type]="inputType" [placeholder]="placeHolderText">  
  `
})
export class AppComponent {
    private placeHolderText: string;
    private inputType: string;
    private inputClass: string;

    constructor() {
        this.placeHolderText = 'type your password...'
        this.inputType = 'password';
    }
}