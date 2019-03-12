import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Forecast } from '../forecast';
@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: [ './forecast.component.css' ]
})
export class ForecastComponent implements OnInit {
    cityName: string;
    foreCastArray: Forecast[] = [];
    constructor(private weatherService: WeatherService) {}

    ngOnInit() {}

    onSubmitCity(city: string) {
        this.cityName = city;
        this.weatherService.getFiveDaysForcast(city).subscribe(
            (data: any) => {
                for (let i = 0; i < data.list.length; i += 8) {
                    this.foreCastArray.push(
                        new Forecast(
                            data.list[i].dt_txt.split(' ')[0],
                            data.list[i].dt_txt.split(' ')[1],
                            data.list[i].weather[0].icon,
                            data.list[i].weather[0].description,
                            data.list[i].main.temp_min,
                            data.list[i].main.temp_max,
                            data.list[i].wind.speed
                        )
                    );
                }
            },
            (error) => console.log(error),
            () => {
                console.log(this.foreCastArray);
            }
        );
    }
}
