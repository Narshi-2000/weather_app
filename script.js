const searchbox = document.querySelector('.inputBox');
const searchbtn = document.getElementById('searchbtn');
const img = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const speed = document.getElementById('speed');
const locationNotfound = document.querySelector('.not-found');
const weather_body = document.querySelector('.body');

async function checkWeather(city){
    const api_key="e73b28e708bd5a7bb97c3873c3adfff5";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const data =await fetch(`${url}`).then(response => response.json());

    if(data.cod==='404'){
        locationNotfound.style.display ="flex";
        weather_body.style.display = "none";
        return;
    }

    locationNotfound.style.display ="none";
    weather_body.style.display="flex";
    temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C` ;
    description.innerHTML = `${data.weather[0].description}`;

    humidity.innerHTML = `${data.main.humidity}%`
    speed.innerHTML = `${data.wind.speed}Km/H`
    
    switch(data.weather[0].main){
        case 'Clouds':
            img.src= "/assests/cloud.png";
            break;
        case 'Clear':
            img.src = "/assests/clear.png";
            break;
        case 'Rain':
            img.src = "/assests/rain.png";
            break;
        case 'Mist':
            img.src = "/assests/mist.png";
            break;
        case 'Snow':
            img.src = "/assests/snow.png";
            break;
    }

}

searchbtn.addEventListener('click', ()=>{
    checkWeather(searchbox.value);
})