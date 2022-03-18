export default class Weather {
    constructor (WEATHER_API_KEY) {
        this.WEATHER_API_KEY = WEATHER_API_KEY;
        this.lat = 0;
        this.lng = 0;
        this.localWeatherData = JSON.parse(localStorage.getItem("weatherDetails"));
        console.log(this.localWeatherData);
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
        if(this.weatherDataOutdated(this.localWeatherData)) {
            console.log("%coutdated", "color:red");
            // this.getWeather();
        } else {
            console.log("%cnot outdated", "color:green");
            this.loadFromLocalStorage(this.localWeatherData);
        }
    }

    weatherDataOutdated(data) {
        if(data != null){
            if(Math.abs(data.timestamp - Date.now()/6e4) < 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    getWeather() {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&units=metric&appid=${this.WEATHER_API_KEY}`;
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.temperature = json.main.temp;
                this.windSpeed = json.wind.speed;
                this.windDeg = json.wind.deg;
                this.weatherDescription = json.weather[0].description;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.printWeatherDetails();
                this.defineSport(this.windSpeed);
            })
    }

    saveToLocalStorage() {
        //save temperature, windspeed, winddegree and fetchtimestamp in JSON object

        //save JSON in local storage and replace if it already exists
    }

    loadFromLocalStorage(data) {
        console.table(data);
        this.temperature = data.temperature;
        this.windSpeed = data.windSpeed;
        this.windDeg = data.windDeg;

        this.printWeatherDetails();
        this.defineSport(this.windSpeed);
    }

    defineSport(windSpeed) {
        let sport;
        if(windSpeed < 25) {
            sport = "scuba-diving";
            document.querySelector('.quote').innerHTML = 'Perfect weather for a dive!'
        } else {
            sport = "surfing";
            document.querySelector('.quote').innerHTML = 'Great waves coming ahead!'
        }
        this.getSportImg(sport);
    }

    getSportImg(sport) {
        let url = `https://sports.api.decathlon.com/sports/${sport}`;
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                let sportImg = json.data.relationships.images.data[0].url;
                document.querySelector('.sport_image img').src = sportImg;
            })
            .catch((err) => {
                console.log(err);
            }) 

    }


    printWeatherDetails() {
        document.querySelector('.temperature span').innerHTML = Math.round(this.temperature);
        document.querySelector('.wind_direction').innerHTML = this.setWindDirection(this.windDeg);
        document.querySelector('.wind_speed span').innerHTML = Math.round(this.windSpeed);  
        document.querySelector('.wind_arrow').style.transform = `rotate(${this.windDeg}deg)`;
    }
     
    setWindDirection(deg) {
       if (deg > 337.5 || deg < 22.5) {
           return "N";
       } else if (deg >= 22.5 && deg < 67.5) {
           return "NE";
       } else if (deg >= 67.5 && deg < 112.5) {
           return "E";
       } else if (deg >= 112.5 && deg < 157.5) {
           return "SE";
       } else if (deg >= 157.5 && deg < 202.5) {
           return "S"; 
       } else if (deg >= 202.5 && deg < 247.5) {
           return "SW";
       } else if (deg >= 247.5 && deg < 292.5) {
           return "W";
       } else if (deg >= 292.5 && deg < 337.5) {
           return "NW";
       }
    }


    locationError(error) {
        console.log(`error: ${error.message}`);
    
    }
}