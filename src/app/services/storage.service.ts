import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storage = 'cities';

    constructor() {}

    clearStorage() {}
    setData(cityList: any) {
        localStorage.setItem(this.storage, JSON.stringify(Array.from(cityList)));
    }
    getData(): any {
        return JSON.parse(localStorage.getItem(this.storage));
    }
}
