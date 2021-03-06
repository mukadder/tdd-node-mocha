/**
 * Created by mukadder on 3/10/17.
 */
import {bootstrap, Component} from 'angular2/angular2';
import {Highlight} from './highlight.directive'

@Component({
    selector: 'my-app',
    template: `
  <h1>My First Attribute Directive</h1>
  <h4>Pick a highlight color</h4>
  <div>
    <input type="radio" name="colors" (click)="color='lightgreen'">Green
    <input type="radio" name="colors" (click)="color='yellow'">Yellow
    <input type="radio" name="colors" (click)="color='cyan'">Cyan
  </div>
  <p><span [highlight]='color'>Highlight me!</span></p>
  
  `,
    directives: [Highlight]
})

class AppComponent { }

bootstrap(AppComponent);
