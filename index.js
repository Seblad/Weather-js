document.addEventListener("DOMContentLoaded", function onDOMLoaded() {
    const Key = "71cf702a1938c71ca33182dcff355f5f";

    let weather = document.querySelector("#weatherbackground");
    let temperature = document.createElement("div");
    weather.appendChild(temperature);

    let cloudiness = document.createElement("div");
    weather.appendChild(cloudiness);
    cloudiness.classList.contains("fullcloudiness mostlycloudly scatteredclouds cleansky");

    // time.classList.contains("sky-gradient-0 sky-gradient-1 sky-gradient-2 sky-gradient-3 sky-gradient-4 sky-gradient-5 sky-gradient-6 sky-gradient-7 sky-gradient-8 sky-gradient-9 sky-gradient-10 sky-gradient-11 sky-gradient-12 sky-gradient-13 sky-gradient-14 sky-gradient-15 sky-gradient-16 sky-gradient-17 sky-gradient-18 sky-gradient-19 sky-gradient-20 sky-gradient-21 sky-gradient-22 sky-gradient-23 sky-gradient-24")

    let rain = document.createElement("div");
    weather.appendChild(rain);
    rain.classList.contains("raindrizzle shower rainfall heavyrainfall snowheavysnowfall snowlightsnowfall cleansky");

    let wind = document.createElement("div");
    weather.appendChild(wind);
    wind.classList.contains("gentlewind windy hurricane");

    let searchInput = document.getElementById("search-txt");
    searchInput.addEventListener("keyup", enterPressed);
    // DK: enterPressed is invaild name for that function, it's actually searchInputListener as it accepts
    // all of the chars, not only enter (it only checks for enter an then runs findWearherData
    function enterPressed(event) {
        console.log("search input key pressed");
        if (event.key === "Enter") {
            //DK: event is great place to extract searchInput.value and pass it ass the argument
            // to findWeatherDetails
            findWeatherDetails();
        }
    }
    function findWeatherDetails(city) {
        // DK: This is unnecessary conditional, use if only there (see if condition negation)
        if (searchInput.value === "") {
        }
        else {
            // DK: you really don't need to set both of this classes for css instead of .search-after
            // You can use .search-container-after > #search-box   <-- rembember ,achiving things by CSS only is always best way
            document.getElementById("search-container").id = "search-container-after"; // Why not just add class (weather-results) etc; changing ids drops event listener making search no longer working
            document.getElementById("search-box").className = "search-after";
            let SearchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + Key;
            let weatherData = fetch(SearchLink)
                .then(function (response) {
                    console.log("pre-read response: ", response)
                    return response;
                })
                .then(response => response.json())
                .then(function (weatherData) {
                    console.log('weatherData: ', weatherData)
                    return weatherData;
                })
            weatherData.then(function (resolvedWeatherData) {
                weather.className = "search-container-2";

                // temperature DK: this variable isn't used
                let AirTemperatureInCity = Math.round((resolvedWeatherData.main.temp - 273));
                // clouds
                const MAX_CLOUDS = 60;
                let cloudsCount = (resolvedWeatherData.clouds.all / 100) * MAX_CLOUDS;
                // Make clouds in range 0 - 20 ( Math.round(20 x CloudValue) <- can be extracted to function too
                if (cloudsCount >= 0) {
                    // x = 0 <- was lacking definition, therefore it was defined as global
                    for (let x = 0; x < cloudsCount; x++) { // DK: this has no sense
                    //     setInterval(function () {
                        // DK: Extract this to function too (createSingleCloud)
                            let cloud = document.createElement('div')
                            cloudiness.appendChild(cloud);
                            cloud.classList.add('cloud');
                            cloud.classList.add('cloud-v' + Math.floor((Math.random() * 5)+1));
                            cloud.style.marginTop = Math.round(50 + Math.random() * 550) + "px";
                            cloud.style.animationDelay = Math.round(Math.random() * 8000 + Math.random() * 8000) + "ms";
                            // DK: Create function to Random number from range f.e: randomRange(from, to) -> randomRange(200, 500);
                            // DK: Tweak to make cloud.style.animationDuration variable too (by 1-2seconds)
                        // }, 1000);
                    }
                }

                // time
                let CurrentTime = new Date(resolvedWeatherData.dt * 1000);
                console.log("CurrentTime: ", CurrentTime)
                let hour = CurrentTime.getHours();


                // DK: remove all code at the begining to look like code below:
                let time = document.createElement("div");
                time.className = 'sky-gradient-' + hour;
                weather.appendChild(time);

                // DK: extract to determineSunOrMoon
                // DK:  "HeavenlyBody" is kinda confusing why not just "SunOrMoon"?
                // if hour>20 && else if (hour<5) can be simplified to on conditional
                // -> (hour > 20 || hour < 5 )
                if      (hour>20){
                    document.getElementById("HeavenlyBody").className="Moon"
                }
                else if (hour<5){
                        document.getElementById("HeavenlyBody").className="Moon"
                }
                else
                {
                        document.getElementById("HeavenlyBody").className="Sun"
                }
                console.log(time.className);
                //precipitation
                let RainLevel = resolvedWeatherData.rain;
                let SnowLevel = resolvedWeatherData.snow;
                if (RainLevel >= 75) {
                    rain.className = 'heavyrainfall'
                }
                else if (RainLevel >= 50) {
                    rain.className = 'rainfall'
                }
                else if (RainLevel >= 25) {
                    rain.className = 'shower'
                }
                else if (RainLevel > 1) {
                    rain.className = 'raindrizzle'
                }
                else if (SnowLevel >= 50) {
                    rain.className = 'snowheavysnowfall'
                }
                else if (1 < SnowLevel < 50) {
                    rain.className = 'snowlightsnowfall'
                }
                else {
                    rain.className = 'cleanSky'
                }
                // DK: Extract code above to function
                // rain.className = getRainClassByRainLevel(RainLevel);

                let windSpeed = resolvedWeatherData.wind.speed+"km/h";
                // wind
                if (windSpeed > 100) {
                    wind.className = 'hurricane'
                }
                else if (windSpeed > 30) {
                    wind.className = 'windy'
                }
                else {
                    wind.className = "gentlewind"
                }
                document.getElementById("search-container-after").innerHTML +=wind;
                document.getElementById("search-container-after").innerHTML +=cloudiness;
                document.getElementById("search-container-after").innerHTML +=hour;
                document.getElementById("search-container-after").innerHTML +=windSpeed;
                //AirTemperatureInCity CloudValue hour RainLevel windSpeed
            })
        }
    }
})

// let weatherData = fetch("SearchLink")
//     .then(function (response) {
//         console.log("pre-read response: ", response)
//         return response;
//     })
//     .then(response => response.json())
//     .then(function (weatherData) {
//         console.log('weatherData: ', weatherData)
//         return weatherData;
//         // weather.innerHTML=JSON.stringify(weatherData);
//     })





    //


// function enterPressed(event) {
//   if (event.key === "Enter") {
//     fetch(SearchLink);
//   }
// }
// function fetch() {
//     if (searchInput.value === "") {
//     }else {
//         SearchLink.value="https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + Key;
//         fetch(SearchLink)
//         console.log(SearchLink)
//     }
//    }




    // console.log("doc: ", document.body.innerHTML);
    //  function fetchSomethingCool(miliseconds, value) {
    //     return new Promise(function (resolve) {
    //         setTimeout(function () {
    //             resolve(value);
    //         }, miliseconds);
    //     })
    // fetchSomethingCool(2000)
    // .then(() => weather.innerText = weatherData);


// const niecierpliwyData = fetchSomethingCool(500, {data: "something cool"})
// console.log("A tu bylem niecierpliwy: ", niecierpliwyData.toString())
// niecierpliwyData.then((obj) => console.log("moglem poczekac...", obj));


// const randomTime = Math.random() * 10000;
// fetchSomethingCool(randomTime).then(() => console.log("Page opened for: ", randomTime));


