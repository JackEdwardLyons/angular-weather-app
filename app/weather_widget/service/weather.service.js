"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
// import rxjs
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
// import constant variables into service
var constants_1 = require('../constants/constants');
// always call @Injectable: this tells Angular that it is to be "injected" as a data service
var WeatherService = (function () {
    // this service requires Jsonp to be "injected" for it's use
    function WeatherService(Jsonp, http) {
        this.Jsonp = Jsonp;
        this.http = http;
    }
    // ensure the return type is an Observable
    WeatherService.prototype.getCurrentLocation = function () {
        if (navigator.geolocation) {
            return Observable_1.Observable.create(function (observer) {
                // this is not an Observable by default, thus why we "create" an Observeable
                navigator.geolocation.getCurrentPosition(function (pos) {
                    // provide the next piece of data (ie) the position
                    observer.next(pos);
                }),
                    function (err) {
                        return Observable_1.Observable.throw(err);
                    };
            });
        }
        else {
            return Observable_1.Observable.throw('Geolocation is not available with your browser, consider updating?');
        }
    };
    // get current weather for time being that returns an observable of any data type
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        var url = "" + constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + "/" + lat + "," + long;
        // data that is passed in at the end of the url
        var queryParams = '?callback=JSONP_CALLBACK';
        return this.Jsonp.get(url + queryParams)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error('Unable to get weather data: ', err);
            return Observable_1.Observable.throw(err.json());
        });
    };
    // Google allows a standard HTTP request because of CORS
    WeatherService.prototype.getLocationName = function (lat, long) {
        var url = constants_1.GOOGLE_ROOT;
        var queryParams = "?latlng=" + lat + "," + long + "&key=" + constants_1.GOOGLE_KEY;
        return this.http.get(url + queryParams)
            .map(function (location) { return location.json(); })
            .catch(function (err) {
            console.error("Unable to get your location-", err);
            return Observable_1.Observable.throw(err);
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map