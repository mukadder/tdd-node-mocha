/**
 * Created by mukadder on 3/10/17.
 */
import {Component, View, NgFor} from 'angular2/core';

@Component({
    selector: "navbar",
    directives: [NgFor],
    styles: [`
        li{
          color: gray;
        }
    `],
    template: `
        <h2>Democratic Party presidential candidates</h2>
        <ul>
            <li *ngFor="#item of items; #i = index">{{item}} {{i}}</li>
        </ul>
    `
})
export class Navbar {
    items: Array<String>

    constructor() {
        this.items = [
            "Hillary Clinton",
            "Martin O'Malley",
            "Bernie Sanders"
        ]
    }

    ngOnInit() {
        console.log('[Component] navbar ngOnInit');
    }
}
/*
 Lifecycle hooks

 In the previous example, we used the ngOnInit Class method to dump a message [Component] navbar ngOnInit in the console. It is called only when the component is initiated. It exists several hooks that make your life easier when it comes to plug yourself in between component life phases.

 ngOnChanges (if any bindings have changed)
 ngOnInit (after the first check only)
 ngOnDestroy (at the very end before destruction) Implement this interface to get notified when any data-bound property of your directive changes
 ngDoCheck
 ngAfterContentInit
 ngAfterContentChecked
 ngAfterViewInit
 ngAfterViewChecked
 Directive

 Directives allow you to attach behaviour to elements in the DOM. It is also what you used to call a directive in AngularJS, but without a proper view. You can therefore place as many directives as you want on one DOM-element. This is not possible with components.

 Official docs

 Let’s get back to our previous component and this time, let’s make our presidential candidates red. To do so, we are going to create the redify directive:
 */
import {Directive, ElementRef, Renderer} from 'angular2/core';

@Directive({
    selector: '[redify]'
})
export class Redify {
    constructor(private _element: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(_element, 'color', 'red');
}
}
/*
 Notice that in order to obtain a reference to our Presidential Candidate element we injected _element: ElementRef.
 */
import {Redify} from 'path/to/your/Redify/directive';

@Component({
    selector: "navbar",
    directives: [NgFor, Redify],
    ...
        template: `
        <li redify *ngFor="#item of items; #i = index">{{item}} {{i}}</li>
    `
})
/*
 Pipe

 A pipe in Angular2 is the equivalent of filters in AngularJS. As in AngularJS, pipes can be stateless (pure functions, not reevaluated) or stateful (has dependencies that can modify the output).

 A better explanation of what is a pipe is available in the previous article of this series of posts: Angular2 series – Template Syntax

 Official docs

 Let’s get back again to our previous component and this time, let’s create a pipe to transform our presidential candidates last name to uppercase.

 First we create lastnameUppercase pipe:


 */
import {Pipe} from 'angular2/core';

@Pipe({
    name: 'lastnameUppercase'
})
export class LastnameUppercase {
    transform(v, args) {
        return `${v.split(' ')[0]} ${v.split(' ')[1].toUpperCase()}`;
    }
}
import {LastnameUppercase} from './pipes';
@Component({
    selector: "navbar",
    ...
        pipes: [LastnameUppercase],
    template: `
        <li redify *ngFor="#item of items; #i = index">{{item | lastnameUppercase}} {{i}}</li>
    `
})

import {Injectable} from 'angular2/core';

@Injectable()
export class PresidentialCandidate {

    constructor() {}

    getRepublicainList() {
        return [
            "Donald Trump",
            "Rand Paul",
            "Ben Carson"
        ]
    }

    getDemocraticList() {
        return [
            "Hillary Clinton",
            "Martin O'Malley",
            "Bernie Sanders"
        ]
    }
}
import {PresidentialCandidate} from './services';

@Component({
    selector: "navbar",
    providers: [PresidentialCandidate],
    ...
        template: `
        <h2>Democratic Party presidential candidates</h2>
        <ul>
        <li redify *ngFor="#item of democrats; #i = index">{{item | lastnameUppercase}} {{i}}</li>
        </ul>
        <h2>Republican Party presidential candidates</h2>
        <ul>
        <li redify *ngFor="#item of republicans; #i = index">{{item | lastnameUppercase}} {{i}}</li>
        </ul>
    `
})
export class Navbar {
    democrats: Array<String>
    republicans: Array<String>

    constructor(private presidentialService :PresidentialCandidate) {
    this.democrats = presidentialService.getDemocraticList();
    this.republicans = presidentialService.getRepublicainList();
}
}