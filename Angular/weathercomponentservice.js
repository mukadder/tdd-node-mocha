/**
 * Created by mukadder on 3/10/17.
 */
import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styles: []

})
export class WeatherComponent implements OnInit {
    id_city: string = "";
    id_state: string = "";
    op_city: string = "";
    op_region: string = "";
    op_country: string = "";
    op_date: string = "";
    op_text: string = "";
    op_temp: string = "";
    constructor(private _sharedService: SharedService) {
}

ngOnInit() {
}

callWeatherService() {
    this._sharedService.findWeather(this.id_city, this.id_state)
        .subscribe(
            lstresult => {
                this.op_city = lstresult["query"]["results"]["channel"]["location"]["city"];
                this.op_region = lstresult["query"]["results"]["channel"]["location"]["region"];
                this.op_country = lstresult["query"]["results"]["channel"]["location"]["country"];
                this.op_date = lstresult["query"]["results"]["channel"]["item"]["condition"]["date"];
                this.op_text = lstresult["query"]["results"]["channel"]["item"]["condition"]["text"];
                this.op_temp = lstresult["query"]["results"]["channel"]["item"]["condition"]["temp"];
            },
            error => {
                console.log("Error. The findWeather result JSON value is as follows:");
                console.log(error);
            }
        );
}
}
/*
<h2>Open Movie Database</h2>
<div class="col-md-8 col-md-offset-2">
    <div class="form-group">
    <input type="text" required [(ngModel)]="id_movie" (change)="callMovieService()" class="form-control" placeholder="Enter Movie name ...">
    <br><br>
    <h3>Movie Details</h3>
<br>
<p class="well lead">
    <i> Title :</i> {{ this.mv_Title }} <br>
<i> Plot :</i> {{ this.mv_Plot }} <br>
<i> Actors :</i> {{ this.mv_Actors }} <br>
<i> Directed by :</i> {{ this.mv_Director }} <br>
<i> Rated :</i> {{ this.mv_Rated }} <br>
<i> Release Date :</i> {{ this.mv_Released }} <br>
</p>
<p class="text-info">Total # of all the service requests including Weather, Movie, and Currency is :
    <span class="badge">{{this._sharedService.totReqsMade}}</span>
</p>
</div>
</div>

 everal important things are coded in movie.component.html:
 {{ this._sharedService.totReqsMade }}: This is the value that's tracked at the service level and shares its values across all three application components.
 [(ngModel)]="id_movie": The user-entered GUI input is passed to the class that calls this HTML. In this case, the class is MovieComponent.
 (change)="callMovieService()": Whenever this field value is changed, you instruct system to invoke the callMovieService() method that's present in the movie.component.ts file.
 {{ this.mv_Title }}, {{ this.mv_Plot }}, {{ this.mv_Actors }}, {{ this.mv_Director }}, {{ this.mv_Rated }}, {{ this.mv_Released }}: Displays results from the service calls that are made from callMovieService() -> this._sharedService.findMovie(this.id_movie).
 <h2>Yahoo! Weather </h2>
 <div class="col-md-8 col-md-offset-2">
 <div class="form-group">
 <input type="text" [(ngModel)]="id_city" class="form-control" placeholder="Enter City name ..."><br>
 <input type="text" [(ngModel)]="id_state" class="form-control" placeholder="Enter State. Example CA for California ..."><br>
 <button type="button" class="btn btn-primary" (click)="callWeatherService()">Submit</button>
 <br><br><br>
 <br>
 <p class="well lead">
 <i>City, State, Country :</i> {{ this.op_city }} {{ this.op_region }} {{ this.op_country }} <br>
 <i>Current Condition :</i> {{ this.op_text }} <br>
 <i>Current Temperature :</i> {{ this.op_temp }} <br>
 </p>
 <p class="text-info">Total # of all the service requests including Weather, Movie, and Currency is :
 <span class="badge">{{this._sharedService.totReqsMade}}</span>
 </p>
 </div>
 </div>
 h2>Currency Exchange Rates</h2>
 <div class="col-md-8 col-md-offset-2">
 <div class="form-group">
 <input type="text" [(ngModel)]="id_currency" (change)="callCurrencyService()" class="form-control" placeholder="Enter Currency Symbol. Example: GBP(,AUD,INR)...">
 <br><br>
 <h3>Rate Details</h3>
 <br>
 <p class="well lead">Exchange rate relative to Euro in a JSON format: : {{ this.my_result }} </p>
 <p class="text-info">Total # of all the service requests including Weather, Movie, and Currency is :
 <span class="badge">{{this._sharedService.totReqsMade}}</span>
 </p>
 </div>
 </div>The <app-root> selector at the end of index.html is replaced by the contents of app.component.html. In turn, app.component.html contains two selectors: <app-menu> and <router-outlet>. The <app-menu> selector is filled up with the contents of menu.component.html, and <router-outlet> is filled up dynamically depending on the menu selection — that is, with the contents of weather.component.html, currency.component.html, or movie.component.html.
 All of the selectors are static except for the Angular reserved selector <router-outlet></router-outlet>. This selector is filled during runtime, depending on the router value. Only index.html is displayed, and all of the other HTML files that you coded are nested inside the index.html file.
