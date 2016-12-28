import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import constant variables into service
import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT } from '../constants/constants';

// always call @Injectable: this tells Angular that it is to be "injected" as a data service
@Injectable() 
export class WeatherService { 
    // this service requires Jsonp to be "injected" for it's use
    constructor( private Jsonp: Jsonp, private http: Http ) { }
    // ensure the return type is an Observable
    getCurrentLocation(): Observable<any> {
        if ( navigator.geolocation ) {
             return Observable.create( observer => {
               // this is not an Observable by default, thus why we "create" an Observeable
               navigator.geolocation.getCurrentPosition( pos => {
                   // provide the next piece of data (ie) the position
                   observer.next( pos );
             }),
                 err => {
                     return Observable.throw( err );
                 }
             });    
        } else {
            return Observable.throw('Geolocation is not available with your browser, consider updating?');
        }
    }

    // get current weather for time being that returns an observable of any data type
    getCurrentWeather( lat: number, long: number ): Observable<any> {
        const url = `${FORECAST_ROOT}${FORECAST_KEY}/${lat},${long}`;
        // data that is passed in at the end of the url
        const queryParams = '?callback=JSONP_CALLBACK';
        
        return this.Jsonp.get( url + queryParams )
        // convert the data to json, this immediately accesses the body of the data    
            .map( data => data.json() )
            .catch( err => {
                console.error('Unable to get weather data: ', err);
                return Observable.throw( err.json() );
            });
    }
    // Google allows a standard HTTP request because of CORS
    getLocationName( lat: number, long: number ): Observable<any> {
        const url = GOOGLE_ROOT;
        const queryParams = `?latlng=${lat},${long}&key=${GOOGLE_KEY}`;

        return this.http.get( url + queryParams )
            .map( location => location.json() )
            .catch( err => {
                console.error( "Unable to get your location-", err );
                return Observable.throw( err );
            });
    }

}