export class Forecast {
    constructor(
        public day: string,
        public time: string,
        public icon: string,
        public weatherDesc: string,
        public tempMin: string,
        public tempMax: string,
        public windSpeed: string
    ) {}
}
