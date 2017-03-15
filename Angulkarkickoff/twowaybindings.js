/**
 * Created by mukadder on 3/15/17.
 */
/*
 We learned how to use one way data bindings using properties and events. Angular introduces a third option to use with input controls. This directive is called ngModel. The syntax can be a little strange, because this directive combines property and event bindings together.

 With ngModel, we can easily achieve two-way data binding easily. In the following example, we will bind username and password inputs to a user object:
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppComponent = (function () {
    function AppComponent() {
        this.user = {
            username: '',
            password: ''
        };
    }
    AppComponent.prototype.sendUser = function () {
        console.log(this.user);
    };
    AppComponent = __decorate([
        /**
         * Created by mukadder on 3/15/17.
         */ Component({
            selector: 'app-root',
            template: "          \n    <input type=\"text\" [(ngModel)]=\"user.username\">\n    <input type=\"password\" [(ngModel)]=\"user.password\">\n     \n    <button (click)=\"sendUser()\">Send</button>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
