const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const inp = document.querySelector(".input")
inp.addEventListener("input", () => {
    inp.value = inp.value.toUpperCase()
});



const weatherIcon = document.querySelector(".weather-image");

async function checkWeather(city = "warsaw"){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    if(data.cod == "404" || data.cod == "400") {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }
    

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "./images/cloud.png"
    }
    else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "./images/sun.png"
    }
    else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "./images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist" || "Haze") {
        weatherIcon.src = "./images/mist.png"
    }

}

searchBox.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        document.querySelector(".search button").click();
    }
});

searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value)
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
})