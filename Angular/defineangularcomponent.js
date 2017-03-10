/**
 * Created by mukadder on 3/10/17.
 */
@Component({
    selector: 'auction-home',  //  this is place holder for mark up value of selector property this is html tag
    template: `
    HTML or other markup is in-lined here
  `
})
export default class HomeComponent {

    // Application logic goes here
}
import {Component} from 'angular2/core';
import {Route, RouteConfig, RouterOutlet} from 'angular2/router';
import HomeComponent from '../home/home';
import NavbarComponent from '../navbar/navbar';
import FooterComponent from '../footer/footer';
import SearchComponent from '../search/search';
import ProductDetailComponent from "../product-detail/product-detail";

@Component({
    selector: 'auction-application',
    templateUrl: 'app/components/application/application.html', // define template in separate url he templateURL specifies the location of the markup.
    directives: [  //he section directives includes the RouterOutlet and all child components.
        RouterOutlet,
        NavbarComponent,
        FooterComponent,
        SearchComponent,
        HomeComponent
    ]
})
@RouteConfig([ //he annotation @RouteConfig configures two routes for the client-side navigation:
    {path: '/', component: HomeComponent, as: 'Home'}, //he content of the route named Home will be rendered by HomeComponent and mapped to the URL fragment /.
    {path: '/products/:id', component: ProductDetailComponent, as: 'ProductDetail'}
])
/*
 When the user clicks on a particular product title, the content of the default Home route will be replaced with the content of the ProductDetail route, which provides the value of the parameter id and displays the product details in the <router-outlet> area. For example, the link for navigating to the ProductDetail route, that takes product id 1234 as a parameter, can look as follows:

 <a [routerLink]="['/ProductDetail', {'prodId': 1234}]">{{ product.id }}</a>


 */
export default class ApplicationComponent {}

//Dependency Injection Components use services for implementing business logic. Services are just classes that Angular instantiates and then injects into components.
export class ProductService {
    products: Product[] = [];
    getProducts(): Array<Product> {
        // The code to retrieve product into goes here
        return products;
    }
}
//Now if you specify an argument of type ProductService in the HomeComponent constructor, Angular will automatically instantiate and inject that service into the component:
//selector: CSS selector that tells Angular to create and insert an instance of this component where it finds the selector tag in the parent HTML file
/*templateUrl: Component's HTML file
styleUrls: Component's style sheets, such as .css files
A template is a form of HTML that tells Angular how to render the component. On line 5 of Listing 2, templateUrl points to a view named app.component.html.
 Data binding inside the component
 Data binding is a form of HTML that tells Angular how to render the component. In the app.component.ts file, the value of title is set inside the class and is used in the app.component.html file. Data binding can be one-way or two-way. In this case, the mapping is one-way if you mention the variable inside double curly braces {{ }}. The value is passed from the class to the HTML file.




Component{
...
}
//Metadata tells Angular how to process a class. In fact, AppComponent isn't a component until you tell Angular about it by attaching metadata to the class.
export default class HomeComponent {
    products: Product[] = [];

    constructor(productService: ProductService) {
        this.products = productService.getProducts();
    }
}
//Angular’s dependency injection module is flexible, and it is easy to use because the objects can be injected only via constructors. Injectors form a hierarchy (each component has an injector), and the injectable object doesn’t have to be an application-level singleton as it might by default in Spring.
//Inter-component communications
//Inter-component communications
/*
 Component communication can and should be implemented in a loosely coupled manner. A component can declare input and output properties. To pass the data from a parent to a child component, the parent binds the values to the input properties of the child. The child has no need to know who provided the values; it just knows what to do with them.
 */
//If a component needs to pass the data to the outside world, it emits the events via the output property. Emits to whom? It’s none of the component’s business. Whoever is interested can create a listener to the custom component’s event.
//This mechanism allows us to treat components as black boxes, that can get values in or send data out. I recently recorded a short video you might find useful, illustrating one of the implementations of the Mediator design pattern in Angular 2.
//https://yakovfain.com/2016/03/21/implementing-the-mediator-design-pattern-in-angular-2/
/*Creating the routes
Route-creation command
I'm providing instructions here for manual route creation. As of this writing, a CLI command for route creation is under development. You can check the CLI site to see if it's now available.
    For Angular to navigate among components, you need to create routing. Overwrite the menu.component.html file with the contents of Listing 4 so that the HTML includes the correct menus for each component.
 Listing 4. menu.component.html
 1
 2
 3
 4
 5
 6
 7
 8
 9
 <div class="row">
 <div class="col-xs-12">
 <ul class="nav nav-pills">
 <li routerLinkActive="active"> <a [routerLink]="['/weather']" >Weather</a></li>
 <li routerLinkActive="active"> <a [routerLink]="['/movie']" >Movie Details</a></li>
 <li routerLinkActive="active"> <a [routerLink]="['/currency']" >Currency Rates</a></li>
 </ul>
 </div>
 </div>
 The code in Listing 4 provides a mapping between the GUI and the URL path. For example, when the user clicks the Movie Details button in the GUI, Angular knows that it needs to run as if the URL path is http://localhost:4200/movie.
 Next, you'll map the URL paths to the components. In the same folder as the root module, create a config file called app.routing.ts and use the code in Listing 5 as its contents.
 Listing 5. app.routing.ts
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 import { Routes, RouterModule } from '@angular/router';
 import { CurrencyComponent } from "./currency/currency.component";
 import { WeatherComponent } from "./weather/weather.component";
 import { MovieComponent } from "./movie/movie.component";
 const MAINMENU_ROUTES: Routes = [
 //full : makes sure the path is absolute path
 { path: '', redirectTo: '/weather', pathMatch: 'full' },
 { path: 'weather', component: WeatherComponent },
 { path: 'movie', component: MovieComponent },
 { path: 'currency', component: CurrencyComponent }
 ];
 export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);
 In this case, if your URL relative path is movie, you instruct Angular to call the MovieComponent component. In other words, the relative path movie maps to the URL http://localhost:4200/movie.
 Now you need to link this view to its parent component. Overwrite the app.component.html file contents with the following code:
 1
 2
 3
 4
 5
 <div class="container">
 <app-menu></app-menu>
 <hr>
 <router-outlet></router-outlet>
 </div>
 The <app-menu></app-menu> selector will contain the menu. The <router-outlet></router-outlet> selector is a placeholder for the current component. Depending on the URL path, the value can be any of the three components: weather, movie, or currency.
 The module must also be notified about this route. Add two items in the app.module.ts file, as shown on lines 11 and 25 in Listing 6.