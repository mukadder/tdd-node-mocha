/**
 * Created by mukadder on 3/15/17.
 */
[app/logo.component.ts]

import {Component} from '@angular/core';

@Component({
    selector: 'logo',
    template: '<img [src]="logoUrl">'
})
export class LogoComponent {
    logoUrl:string =
        '//angular.io/resources/images/logos/standard/logo-nav.png';
}
//Registering handlers on native browser events

[app/article.component.ts]
import {Component} from '@angular/core';

@Component({
    selector: 'article',
    template: ` 
    <h1>{{title}}</h1> 
    <p>Shares: {{shareCt}}</p> 
    <button>Share</button> 
  `
})
export class ArticleComponent {
    title:string = 'Police Apprehend Tiramisu Thieves';
    shareCt:number = 0;
}

[app/article.component.ts]

import {Component} from '@angular/core';

@Component({
    selector: 'article',
    template: ` 
    <h1>{{title}}</h1> 
    <p>Shares: {{shareCt}}</p> 
    <button (click)="share()">Share</button> 
  `
})
export class ArticleComponent {
    title:string = 'Police Apprehend Tiramisu Thieves';
    shareCt:number = 0;
    share():void {
        ++this.shareCt;
    }
}
import {Component} from '@angular/core';

@Component({
    selector: 'article',
    template: ` 
    <h1>{{title}}</h1> 
    <p>Shares: {{shareCt}}</p> 
    <button on-click="share($event)">Share</button> 
  `
})
export class Article {
    title:string = 'Police Apprehend Tiramisu Thieves';
    shareCt:number = 0;
    share(e:Event):void {
        ++this.shareCt;
    }
}

[app/text-editor.component.ts]

import {Component} from '@angular/core';

@Component({
    selector: 'text-editor',
    template: ` 
    <textarea></textarea> 
  `
})
export class TextEditorComponent {}

[app/article.component.ts]

import {Component} from '@angular/core';

@Component({
    selector: 'article',
    template: ` 
    <h1>{{title}}</h1> 
    <p>Word count: {{wordCount}}</p> 
    <text-editor></text-editor> 
  `
})
export class ArticleComponent {
    title:string = ` 
    Maternity Ward Resorts to Rock Paper Scissors Following  
    Baby Mixup`;
    wordCount:number = 0;

    updateWordCount(e:number):void {
        this.wordCount = e;
    }
}