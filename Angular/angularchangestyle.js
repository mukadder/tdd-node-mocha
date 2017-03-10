/**
 * Created by mukadder on 3/10/17.
 */
@Component({
    selector: 'my-app',
    template: `
    <div [style.background-image]="getProfilePicStyle()">
    </div>
  `
})
export class App {

    getProfilePicStyle() {
        // snip snip -> fetch the url from somewhere
        const profilePicUrl = 'some-remote-server-url.jpg';
        return `url(${profilePicUrl}`;
    }

}
//our root app component this  is old fashioned style manipulations
import {Component} from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
    <div>
      <div [style.background-color]="getStyle()">
        I am a div that wants to be styled
      </div>
      <button (click)="showStyle = !showStyle;">Toggle style</button>
    </div>
  `
})
export class App {
    showStyle: false;

    constructor() {
    }

    getStyle() {
        if(this.showStyle) {
            return "yellow";
        } else {
            return "";
        }
    }
}
import { DomSanitizer  } from '@angular/platform-browser';

@Component({...})
export class App {

    constructor(private sanitizer: DomSanitizer) {}

getProfilePicStyle() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = 'some-remote-server-url.jpg';

    // sanitize the style expression
    return this.sanitizer.bypassSecurityTrustStyle(`url(${profilePicUrl}`);
}

}
//our root app component
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <div [ngClass]="{'my-class': isClassVisible }">
        I am a div that wants to be styled
      </div>
      <button (click)="isClassVisible = !isClassVisible;">Toggle style</button>
    </div>
  `,
    styles: [
        `
  .my-class {
    background-color: yellow;
  }
  `
    ]
})
export class App {
    isClassVisible: false;

    constructor() {
    }

}
/our root app component
import {Component} from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
    <div>
      <div [class.my-class]="isClassVisible">
        I am a div that wants to be styled
      </div>
      <button (click)="isClassVisible = !isClassVisible;">Toggle style</button>
    </div>
  `,
    styles: [
        `
  .my-class {
    background-color: yellow;
  }
  `
    ]
})
export class App {
    isClassVisible: false;

    constructor() {
    }

}

mport {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
    selector: '[styled]',
})
export class StyledDirective {
    constructor(public el: ElementRef, public renderer: Renderer) {
    // el.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
}
}
