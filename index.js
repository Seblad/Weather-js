document.addEventListener("DOMContentLoaded", function onDOMLoaded() {
    const Key = "71cf702a1938c71ca33182dcff355f5f";
let weather = document.querySelector("#weatherbackground");
    let temperature = document.createElement("div"); 
    weather.appendChild(temperature);
    temperature.classList.contains("hot heat chilly cold")
        let cloudiness = document.createElement("div"); 
        weather.appendChild(cloudiness);
        cloudiness.classList.contains("fullcloudiness mostlycloudly scatteredclouds cleansky")
            let time = document.createElement("div");
            weather.appendChild(time);
            time.classList.contains("sky-gradient-0 sky-gradient-1 sky-gradient-2 sky-gradient-3 sky-gradient-4 sky-gradient-5 sky-gradient-6 sky-gradient-7 sky-gradient-8 sky-gradient-9 sky-gradient-10 sky-gradient-11 sky-gradient-12 sky-gradient-13 sky-gradient-14 sky-gradient-15 sky-gradient-16 sky-gradient-17 sky-gradient-18 sky-gradient-19 sky-gradient-20 sky-gradient-21 sky-gradient-22 sky-gradient-23 sky-gradient-24")
                let rain = document.createElement("div");
                weather.appendChild(rain);
                rain.classList.contains("raindrizzle shower rainfall heavyrainfall snowheavysnowfall snowlightsnowfall cleansky")
                    let wind = document.createElement("div");
                    weather.appendChild(wind);
                    wind.classList.contains("gentlewind windy hurricane")
let searchInput = document.getElementById("search-txt");
searchInput.addEventListener("keyup", enterPressed);
    function enterPressed(event){
        if (event.key === "Enter")
        findWeatherDetails();
    }
    function findWeatherDetails(){
        if (searchInput.value===""){
            }
            else   {
            document.getElementById("search-container").id = "search-container-after";
            document.getElementById("search-box").className="search-after";
            let  SearchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+ Key;
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
                weather.className="search-container-2"
                let AirTemperatureInCity = Math.round((resolvedWeatherData.main.temp-273));
            // temperature
                    if(AirTemperatureInCity>=20){
                        temperature.className='hot'
                    }
                    else if(AirTemperatureInCity>=15){
                        temperature.className='heat'
                    }
                    else if (AirTemperatureInCity>=5){   
                        temperature.className='chilly'
                    }
                    else {   
                        temperature.className='cold'
                    }
            // clouds
                let CloudValue = resolvedWeatherData.clouds.all;
                    if(CloudValue>=1000){
                        for(x=0; x<9;x++){
                            cloudiness.className='x2 cloud'
                            let cloud = document.createElement('div');
                            cloud.className='x1';
                        }
                    }
                    else if(CloudValue>1000){
                        cloudiness.className='x2 cloud'
                        for(x=0; x<9;x++){
                            cloudiness.appendChild(cloud)
                            cloud.classList.add('cloud')
                            cloud.className='x1';
                        }
                    }
                    else if(CloudValue>=0){
                        cloudiness.className='fullcloudiness'
                        for(x=0; x<1;x++){
                            setInterval(function (){let cloud = document.createElement('div')
                            cloudiness.appendChild(cloud)
                            cloud.classList.add('cloud')     
                            cloud.classList.add('x'+ Math.floor((Math.random() * 5) + 1))}, 1000);
                        }
                    }   
                    else{
                        cloudiness.className='x2 cloud'
                        for(x=0; x<9;x++){
                            let cloud = document.createElement('div');
                            cloud.className='x1';
                        }
                    }
                
            // time
            let CurrentTime = new Date(resolvedWeatherData.dt*1000);
            console.log("CurrentTime: ", CurrentTime)
            let hour = CurrentTime.getHours();
                    time.className='sky-gradient-'+hour;
                    console.log(time.className)
            //precipitation
                let RainLevel = resolvedWeatherData.rain;
                let SnowLevel = resolvedWeatherData.snow;
                    if(RainLevel>=75){
                        rain.className='heavyrainfall'
                    }
                    else if(RainLevel>=50){
                        rain.className='rainfall'
                    }
                    else if(RainLevel>=25){
                        rain.className='shower'
                    }
                    else if(RainLevel>1){
                        rain.className='raindrizzle'
                    }
                    else if(SnowLevel>=50){
                        rain.className='snowheavysnowfall'
                    }
                    else if(1<SnowLevel<50){
                        rain.className='snowlightsnowfall'     
                    }
                    else{
                        rain.className='cleanSky'
                    }
                let windSpeed = resolvedWeatherData.speed;
            // wind
                    if(windSpeed>100)
                    {
                        wind.className='hurricane'
                    }
                    else if (windSpeed>30){
                        wind.className='windy'
                    }
                    else {
                        wind.className="gentlewind"
                    }
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


