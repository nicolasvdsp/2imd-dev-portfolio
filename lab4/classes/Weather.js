export default class Weather {
    constructor (WEATHER_API_KEY) {
        this.WEATHER_API_KEY = WEATHER_API_KEY;
        this.lat = 0;
        this.lng = 0;

        this.getLocation();
    }   

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.locationSuccess.bind(this),
            this.locationError.bind(this)
        );
    }

    locationSuccess(location) {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        console.log(`latitude: ${this.lat}, longitude: ${this.lng}`);
    }
    locationError(error) {
        console.log(`error: ${error.message}`);
    }
}