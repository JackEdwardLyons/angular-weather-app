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
var constants_1 = require('../constants/constants');
// It is important to keep the service contained to this particular component
var weather_service_1 = require('../service/weather.service');
// import Weather Model
var weather_1 = require('../model/weather');
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        this.service = service;
        // create a new model instance with no data
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        // set default speed/temp units (mph/kph)
        this.currentSpeedUnit = "mph";
        this.currentTempUnit = "fahrenheit";
        this.currentLocation = "";
        this.weatherIcons = new Skycons({});
        // set property to check if data has been received and loaded into DOM
        this.dataReceived = false;
    }
    // built in init method
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    // this method is not linked to the service
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.getCurrentWeather();
            _this.getLocationName();
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            // drill down into JSON object and retreieve data
            _this.weatherData.temp = weather["currently"]["temperature"],
                _this.weatherData.summary = weather["currently"]["summary"],
                _this.weatherData.wind = weather["currently"]["windSpeed"],
                _this.weatherData.humidity = weather["currently"]["humidity"],
                _this.weatherData.icon = weather["currently"]["icon"];
            console.log("The weather:", _this.weatherData); // testing
            _this.setWeatherIcon();
            _this.dataReceived = true;
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (location) {
            console.log(location);
            _this.currentLocation = location.results[2]["formatted_address"].split(" ");
            _this.currentLocation = _this.currentLocation[0] + ", " + _this.currentLocation[_this.currentLocation.length - 1];
            return _this.currentLocation;
        });
    };
    // add to the weather card as a click event
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    };
    WeatherComponent.prototype.toggleTempUnits = function () {
        if (this.currentTempUnit === "fahrenheit") {
            this.currentTempUnit = "celcius";
        }
        else {
            this.currentTempUnit = "fahrenheit";
        }
    };
    WeatherComponent.prototype.toggleSpeedUnits = function () {
        if (this.currentSpeedUnit === "kph") {
            this.currentSpeedUnit = "mph";
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    };
    WeatherComponent.prototype.setWeatherIcon = function () {
        // https://darkskyapp.github.io/skycons/
        this.weatherIcons.add("weather-icon", this.weatherData.icon);
        this.weatherIcons.play();
    };
    WeatherComponent.prototype.setComponentStyles = function () {
        if (this.weatherData.icon) {
            this.weatherIcons.color = constants_1.WEATHER_COLORS[this.weatherData.icon]["color"];
            return constants_1.WEATHER_COLORS[this.weatherData.icon];
        }
        else {
            this.weatherIcons.color = constants_1.WEATHER_COLORS["default"]["color"];
            return constants_1.WEATHER_COLORS["default"];
        }
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: './weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map