import { Component, OnInit } from '@angular/core'; 
import { WEATHER_COLORS } from '../constants/constants';
// It is important to keep the service contained to this particular component
import { WeatherService } from '../service/weather.service';
// import Weather Model
import { Weather } from '../model/weather';
// declare Skycons js library because it doesn't have a TS definition file
declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: './weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
  // create a variable based off the browsers geolocation object prototype 
  pos: Position;
  // create a new model instance with no data
  weatherData = new Weather(null, null, null, null, null);
  // set default speed/temp units (mph/kph)
  currentSpeedUnit = "mph";
  currentTempUnit  = "fahrenheit";
  currentLocation  = "";
  weatherIcons     = new Skycons({ });
  // set property to check if data has been received and loaded into DOM
  dataReceived     = false;

  constructor( private service: WeatherService ) { }
  // built in init method
  ngOnInit() {
    this.getCurrentLocation();
  }
  // this method is not linked to the service
  getCurrentLocation() {
    this.service.getCurrentLocation()
      // we need to subscribe to the Observable
      .subscribe( position => {
        this.pos = position;
        this.getCurrentWeather();
        this.getLocationName();
      },
      err => console.error( err ));
  }

  getCurrentWeather() {
    this.service.getCurrentWeather( this.pos.coords.latitude, this.pos.coords.longitude )
        .subscribe(weather => {
            // drill down into JSON object and retreieve data
            this.weatherData.temp     = weather["currently"]["temperature"],
            this.weatherData.summary  = weather["currently"]["summary"],
            this.weatherData.wind     = weather["currently"]["windSpeed"],
            this.weatherData.humidity = weather["currently"]["humidity"],
            this.weatherData.icon     = weather["currently"]["icon"]
            console.log("The weather:" , this.weatherData); // testing
            this.setWeatherIcon();
            this.dataReceived = true;
        },
        err => console.error( err ));
  }

  getLocationName() {
    this.service.getLocationName( this.pos.coords.latitude, this.pos.coords.longitude )
        .subscribe( location => {
            console.log(location);
            this.currentLocation = location.results[2]["formatted_address"].split(" ");
            this.currentLocation = `${this.currentLocation[0]}, ${this.currentLocation[ this.currentLocation.length -1 ]}`;
            return this.currentLocation;
        })
  }
  // add to the weather card as a click event
  toggleUnits() {
      this.toggleTempUnits();
      this.toggleSpeedUnits();
  }

  toggleTempUnits() {
    if ( this.currentTempUnit === "fahrenheit" ) {
         this.currentTempUnit = "celcius";
    } else {
         this.currentTempUnit = "fahrenheit";
    }
  }

  toggleSpeedUnits() {
    if ( this.currentSpeedUnit === "kph" ) {
         this.currentSpeedUnit = "mph";
    } else {
         this.currentSpeedUnit = "kph";
    }
  }

  setWeatherIcon() {
      // https://darkskyapp.github.io/skycons/
      this.weatherIcons.add( "weather-icon", this.weatherData.icon );
      this.weatherIcons.play();
  }

  setComponentStyles(): Object {
    if ( this.weatherData.icon ) {
        this.weatherIcons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
        return WEATHER_COLORS[ this.weatherData.icon ];
    } else {
        this.weatherIcons.color = WEATHER_COLORS["default"]["color"];
        return WEATHER_COLORS[ "default" ];
    }
  }
}