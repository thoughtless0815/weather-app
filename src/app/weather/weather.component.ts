import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StorageService } from '../services/storage.service';

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
        console.log('reload');
        this.getCitiesData();
    }

    private getCitiesData() {
        this.cityList.forEach((city) => {
            this.weatherService.getWeatherDetails(city).subscribe((data: any) => {
                console.log(city);
                this.weatherMap.set(data.name, data);
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

    onSubmitCity(): void {
        if (!this.city) {
            alert('Enter City');
            return;
        }
        this.weatherService.getWeatherDetails(this.city).subscribe((data: any) => {
            this.setRetrievedData(data);
        }, () => (this.cityErrorMessage = 'City not found'));
    }

    private setRetrievedData(data: any) {
        this.cityErrorMessage = '';
        this.cityList = new Set(this.cityList);
        this.cityList.add(this.city.toLowerCase());
        this.weatherMap.set(data.name, data);
    }

    onRefresh(element) {
        if (this.refresh) {
            console.log('1 = ' + this.refresh);
            element.textContent = 'Refresh Off';
            this.refresh = !this.refresh;
            console.log('2 = ' + this.refresh);
        } else {
            element.textContent = 'Refresh On';
            this.refresh = !this.refresh;
        }
    }

    removeCityDetails(weather: any) {
        console.log(weather);
        this.weatherMap.delete(weather.name);
        this.cityList = new Set(this.cityList);
        this.cityList.delete(weather.name.toLowerCase());
    }

    clearStorage() {
        this.cityList = new Set();
        this.weatherMap.clear();
        localStorage.clear();
    }
}
// refresh = !refresh
