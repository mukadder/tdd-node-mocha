"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by mukadder on 3/15/17.
 */
[app / logo.component.ts];
var core_1 = require('@angular/core');
var LogoComponent = (function () {
    function LogoComponent() {
        this.logoUrl = '//angular.io/resources/images/logos/standard/logo-nav.png';
    }
    LogoComponent = __decorate([
        core_1.Component({
            selector: 'logo',
            template: '<img [src]="logoUrl">'
        })
    ], LogoComponent);
    return LogoComponent;
}());
exports.LogoComponent = LogoComponent;
//Registering handlers on native browser events
[app / article.component.ts];
var ArticleComponent = (function () {
    function ArticleComponent() {
        this.title = 'Police Apprehend Tiramisu Thieves';
        this.shareCt = 0;
    }
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'article',
            template: " \n    <h1>{{title}}</h1> \n    <p>Shares: {{shareCt}}</p> \n    <button>Share</button> \n  "
        })
    ], ArticleComponent);
    return ArticleComponent;
}());
exports.ArticleComponent = ArticleComponent;
[app / article.component.ts];
var ArticleComponent = (function () {
    function ArticleComponent() {
        this.title = 'Police Apprehend Tiramisu Thieves';
        this.shareCt = 0;
    }
    ArticleComponent.prototype.share = function () {
        ++this.shareCt;
    };
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'article',
            template: " \n    <h1>{{title}}</h1> \n    <p>Shares: {{shareCt}}</p> \n    <button (click)=\"share()\">Share</button> \n  "
        })
    ], ArticleComponent);
    return ArticleComponent;
}());
exports.ArticleComponent = ArticleComponent;
var Article = (function () {
    function Article() {
        this.title = 'Police Apprehend Tiramisu Thieves';
        this.shareCt = 0;
    }
    Article.prototype.share = function (e) {
        ++this.shareCt;
    };
    Article = __decorate([
        core_1.Component({
            selector: 'article',
            template: " \n    <h1>{{title}}</h1> \n    <p>Shares: {{shareCt}}</p> \n    <button on-click=\"share($event)\">Share</button> \n  "
        })
    ], Article);
    return Article;
}());
exports.Article = Article;
[app / text - editor.component.ts];
var TextEditorComponent = (function () {
    function TextEditorComponent() {
    }
    TextEditorComponent = __decorate([
        core_1.Component({
            selector: 'text-editor',
            template: " \n    <textarea></textarea> \n  "
        })
    ], TextEditorComponent);
    return TextEditorComponent;
}());
exports.TextEditorComponent = TextEditorComponent;
[app / article.component.ts];
var ArticleComponent = (function () {
    function ArticleComponent() {
        this.title = " \n    Maternity Ward Resorts to Rock Paper Scissors Following  \n    Baby Mixup";
        this.wordCount = 0;
    }
    ArticleComponent.prototype.updateWordCount = function (e) {
        this.wordCount = e;
    };
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'article',
            template: " \n    <h1>{{title}}</h1> \n    <p>Word count: {{wordCount}}</p> \n    <text-editor></text-editor> \n  "
        })
    ], ArticleComponent);
    return ArticleComponent;
}());
exports.ArticleComponent = ArticleComponent;
