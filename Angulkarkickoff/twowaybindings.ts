/**
 * Created by mukadder on 3/15/17.
 */
/*
 We learned how to use one way data bindings using properties and events. Angular introduces a third option to use with input controls. This directive is called ngModel. The syntax can be a little strange, because this directive combines property and event bindings together.

 With ngModel, we can easily achieve two-way data binding easily. In the following example, we will bind username and password inputs to a user object:
 */

@Component({
    selector: 'app-root',
    template: `          
    <input type="text" [(ngModel)]="user.username">
    <input type="password" [(ngModel)]="user.password">
     
    <button (click)="sendUser()">Send</button>
  `
})
export class AppComponent {
    private user = {
        username: '',
        password: ''
    }

    sendUser(){
        console.log(this.user);
    }
}