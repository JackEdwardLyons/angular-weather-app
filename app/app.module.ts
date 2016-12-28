// import Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import JSONP module for HTTP requests    
import { JsonpModule, HttpModule } from '@angular/http';
// import Components
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather_widget/component/weather.component';
// import Pipes
import { SpeedUnitPipe } from './weather_widget/pipe/speed-unit.pipe';
import { TempUnitPipe } from './weather_widget/pipe/temp-unit.pipe';

@NgModule({
    imports: [ BrowserModule, JsonpModule,HttpModule ],
    declarations: [ AppComponent, WeatherComponent, SpeedUnitPipe, TempUnitPipe ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }