import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { WeatherService } from '../services/weather.service';

@Component({
    selector: 'app-city-weather',
    templateUrl: './city-weather.component.html',
    styleUrls: [ './city-weather.component.css' ],
    animations: [
        trigger('myInsertRemoveTrigger', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [ animate('1s') ]),
            transition('* => void', [ animate('5s', style({ opacity: 0 })) ])
        ])
    ]
})
export class CityWeatherComponent implements OnInit, OnChanges {
    interval: any;
    @Input() weather: any;
    @Input() refresh = false;
    @Output() remove: EventEmitter<any> = new EventEmitter();

    constructor(private weatherService: WeatherService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.refresh.currentValue === false) {
            this.stopInterval();
        } else {
            this.startInterval();
        }
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.weatherService.getWeatherDetails(this.weather.name).subscribe((data: any) => {
                this.weather = data;
            });
        }, 2000);
    }

    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    ngOnInit() {}

    removeCityDetails() {
        this.remove.emit(this.weather);
    }
}
