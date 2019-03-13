import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    constructor(private http: HttpClient) {}
    getWeatherDetails(city: string): Observable<any[]> {
        let currentData = this.http.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a2295395cee570b93c09a14d74ec0cd&units=metric`
        );
        let fiveDaysData = this.http.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2a2295395cee570b93c09a14d74ec0cd&units=metric`
        );
        return forkJoin([ currentData, fiveDaysData ]);
    }

    getWeatherByLocation(lat: string, lon: string): Observable<object> {
        return this.http.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2a2295395cee570b93c09a14d74ec0cd&units=metric`
        );
    }

    getFiveDaysForcast(city: string): Observable<object> {
        return this.http.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2a2295395cee570b93c09a14d74ec0cd&units=metric`
        );
    }
}
