import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-five-days',
    templateUrl: './five-days.component.html',
    styleUrls: [ './five-days.component.css' ]
})
export class FiveDaysComponent implements OnInit {
    @Input() fiveDaysData: any;
    constructor() {}

    ngOnInit() {}
}
