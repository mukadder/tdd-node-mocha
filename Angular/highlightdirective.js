/**
 * Created by mukadder on 3/10/17.
 */
import {Directive, ElementRef, Renderer, Input} from 'angular2/angular2';

@Directive({
    selector: '[highlight]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})

export class Highlight {
    @Input() highlight: string;
    private _defaultColor = 'red';
    constructor(private el: ElementRef, private renderer: Renderer) { }

onMouseEnter() { this._highlight(this.highlight || this._defaultColor); }
onMouseLeave() { this._highlight(null); }

private _highlight(color:string) {
    this.renderer.setElementStyle(this.el, 'background-color', color);
}

}
/*Angular2 Tutorial: Creating Attribute Directives

 According to Angular2 documentation, directives are classes that can change the component behavior or/and appearance, which basically means they can add CSS classes and styles, register events and manipulate the component’s properties.

 In this tutorial I’m going to show you how to create a very simple directive that will register the click event and add a CSS style to the component. I know we can do this without directives, but keep in mind that this is just an example I’m using to illustrate how directives work.

 So let’s jump right into the code:

 message.directive.ts
 */
import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[showMessage]' })
export class MessageDirective {

    constructor(el: ElementRef, renderer: Renderer) {
        renderer.setElementStyle(el.nativeElement, 'cursor', 'pointer');
        renderer.listen(el.nativeElement, 'click', function(){
            alert('Test');
        });
    }
}
/*As you can see, a directive is just a regular class decorated with @Directive, this decorator allows you to specify a selector, which is the name you’re going to use to call your directive later, in this example the selector is showMessage.

    Now let’s take a look at the constructor, to make things easier angular2 is injecting two objects for us: ElementRef and Renderer. The first one allows us to access the DOM element, as the second is used to add/modify its properties.

    There are two things I’m doing in this constructor, in the first line I’m using the Renderer’s setElementStyle function to change the cursor style to pointer, and in the second I’m just registering a callback function to the click event.

 mport { NgModule }      from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
 import { AppComponent }   from './app.component';
 import { FormsModule }   from '@angular/forms';
 import { MessageDirective } from './message.directive';

 @NgModule({
 imports:      [ BrowserModule, FormsModule],
 declarations: [ AppComponent, MessageDirective],
 bootstrap:    [ AppComponent ]
 })
 export class AppModule { }

 hat’s it, easy right! Now we can use the directive by just adding its selector to the component as follows:

 <p showMessage>Click Here</p>
 If you run your application you’ll see that this p element looks like a link, when you click on it the message 'Test' pops up.

