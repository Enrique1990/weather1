//declare variables and select elements
var ROOT_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
var API_KEY = "82f00ca449397d0825aa2aa817277d41";
//select the elements cityTitle, zip input bar, weather div, img with class icon, span with class temp, span with class humid, select the span with the class deg
var cityTitle = document.querySelector(".cityTitle");
var zip = document.querySelector(".zip");
var weather = document.querySelector(".weather");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humid");
var deg = document.querySelector(".deg");

var kelvin
var convert = document.querySelector(".convert");
var icons = [{
    weather : "img/cloudy.png"
},
{ 

    weather : "img/party-cloudy.png"
},
{ 
    weather : "img/rain.png"
},
{ 
    weather : "img/snow.png"
},
{ 
    weather : "img/sun.png"
},
{ 
    weather : "img/thunderstorm.png"
}];
//define functions
function KtoF(kelvin){
return Math.floor((1.8 * kelvin) - 459.67);
}
function KtoC(kelvin){
return Math.floor(kelvin - 273.15) ;

}
function iconSelector(weather){
    switch (weather){
        case 'Cloudy':
        case 'Clouds':
        icon.src = icons[0].weather;
        break;
        case 'Partly-cloudy':
        icon.src=icons[1].weather;
        break;
        case 'Wet':
        case 'Rain':
        icon.src = icons[3].weather;
        break;
        case'Dry':
        case'Haze':
        case'Mist':
        case'Hot':
        case'Calm':
        case'Clear':
        case'Sun':
        icon.src = icons[4].weather;
        break;
        case'Stormy':
        case'Thunderstorm':
        icon.src = icons[5].weather;
        break;
    }
    return;
}
convert.addEventListener("click", function (){
if(convert.innerHTML === "Convert to C"){
    temp.textContent = KtoC(kelvin);
    deg.innerHTML = "&deg; C";
    convert.textContent = "Convert to F";
} else {
    temp.textContent = KtoF(kelvin);
    deg.innerHTML = "&deg; F";
    convert.textContent = "Convert to C";

}
});
function getWeather(zipCode){
console.log(zipCode);
if(zipCode.length !==5){
    alert('The zip code should be 5 character ');
    return;
}
$.ajax({
    type: "GET",
    url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
    datatype: 'json',
    success: function(data){
        console.log(data);
        cityTitle.textContent = data.name;
        weather.textContent = data.weather[0].main;
        humid.textContent = data.main.humidity;
        kelvin = data.main.temp;
        temp.innerHTML = KtoF(kelvin)
       // icon.src = iconSelector(data.weather[0].main)
       iconSelector(data.weather[0].main)
    },
    error: function(error){
        console.log("there was an error");
    }
});
}

//call functions and/or add Event Listeners
zip.addEventListener("keypress",function(e){
    //console.log(e);
    if(e.keyCode== 13){
        getWeather(zip.value);
    }
})

