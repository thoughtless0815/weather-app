import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ForecastComponent } from './forecast/forecast.component';
import { FiveDaysComponent } from './five-days/five-days.component';

@NgModule({
    declarations: [ AppComponent, WeatherComponent, CityWeatherComponent, ForecastComponent, FiveDaysComponent ],
    imports: [ BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, AppRoutingModule ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
