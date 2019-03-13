import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';
import { Forecast } from '../forecast';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: [ './weather.component.css' ]
})
export class WeatherComponent implements OnInit {
    city: string;
    cityErrorMessage: string;
    weatherMap = new Map<string, object>();
    cityList = new Set<string>();
    interval: any;
    refresh = false;

    constructor(private weatherService: WeatherService, private storageService: StorageService) {}

    ngOnInit(): void {
        const cities = this.storageService.getData();
        if (cities && cities.length) {
            this.cityList = cities;
        }
        this.reloadCities(cities);
    }

    private reloadCities(cities: any) {
        this.cityList.forEach((city) => {
            this.weatherService.getWeatherDetails(city).subscribe((dataList: any) => {
                this.weatherMap.set(dataList[0].name, {
                    currentData: dataList[0],
                    fiveDaysData: this.prepareFiveDaysData(dataList[1])
                });
            });
        });
    }

    @HostListener('window:beforeunload')
    storeCities() {
        this.storageService.setData(this.cityList);
    }

    getValues(map) {
        return Array.from(map.values()).reverse();
    }

    onSubmitCity(city: string): void {
        this.city = city;
        if (!this.city) {
            alert('Enter City');
            return;
        }
        this.weatherService.getWeatherDetails(this.city).subscribe(
            (dataList: any) => {
                this.setDataInMap(dataList);
                //  console.log(dataList);
            },
            () => {
                this.cityErrorMessage = 'City not found';
            },
            () => {
                console.log(this.weatherMap);
            }
        );
    }

    private setDataInMap(dataList: any) {
        //console.log(dataList);

        this.cityErrorMessage = '';
        this.cityList = new Set(this.cityList);
        this.cityList.add(this.city.toLowerCase());

        //console.log(this.prepareFiveDaysData(dataList[1]));

        this.weatherMap.set(dataList[0].name, {
            currentData: dataList[0],
            fiveDaysData: this.prepareFiveDaysData(dataList[1])
        });
    }
    prepareFiveDaysData(data: any): any {
        let foreCastArray = [];
        for (let i = 0; i < data.list.length; i += 8) {
            foreCastArray.push(
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
        return foreCastArray;
    }

    onRefresh(element) {
        if (this.refresh) {
            element.textContent = 'Refresh Off';
            this.refresh = !this.refresh;
        } else {
            element.textContent = 'Refresh On';
            this.refresh = !this.refresh;
        }
    }

    removeCityDetails(weather: any) {
        this.weatherMap.delete(weather.currentData.name);
        this.cityList = new Set(this.cityList);
        this.cityList.delete(weather.currentData.name.toLowerCase());
    }

    clearStorage() {
        this.cityList = new Set();
        this.weatherMap.clear();
        localStorage.clear();
    }
}
// refresh = !refresh
