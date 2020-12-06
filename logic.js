let lat;
let lon;
let tempInC;
let weatherid;

const tempText= document.querySelector(".temp-deg");
const citynameText = document.querySelector(".location-timezone");
const desc = document.querySelector(".temp-description");
const country = document.querySelector(".country");
const feelLike = document.querySelector(".feel-like .add-data");
const minTemp = document.querySelector(".min-temp .add-data");
const maxTemp = document.querySelector(".max-temp .add-data");
const img = document.querySelector("img");
const pressure = document.querySelector(".presure .add-data");
const humidity = document.querySelector(".humidity .add-data");
const windSpeed = document.querySelector(".wind-speed .add-data");



window.addEventListener('load', getTemp);

function getTemp(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            //console.log(lat,long);

            const apis = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3a87a59902f2f2e6a985b0c85b238288&units=metric`
            fetch(apis)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    tempInC = data.main.temp;
                    //console.log(tempInC);

                    tempText.innerText = tempInC;
                    citynameText.innerText = data.name;
                    desc.innerText = data.weather[0].description;

                    if(data.sys.country === 'IN'){
                        country.innerText = 'INDIA';
                    }
                    else{
                        country.innerText = data.sys.country;
                    }

                    feelLike.innerText = data.main.feels_like;
                    minTemp.innerText = data.main.temp_min;
                    maxTemp.innerText = data.main.temp_max;
                    pressure.innerText = data.main.pressure;
                    humidity.innerText = data.main.humidity;
                    windSpeed.innerText = data.wind.speed;


                    //console.dir(img.src);
                    weatherid = data.weather[0].id;
                    changeimg();

                })
                .catch(e=>{
                console.log("error :",e)
                })
        })
    }
    
    
}

function changeimg(){
    //console.log(weatherid);

    if(weatherid>200 && weatherid<=232){
        img.src = 'Weather icon/thunderstorm.png';
    }
    else if(weatherid>300 && weatherid<=321){
        img.src = 'Weather icon/shower rain.png';
    }
    else if(weatherid>500 && weatherid<=531){
        img.src = 'Weather icon/rain.png';
    }
    else if(weatherid>600 && weatherid<=622){
        img.src = 'Weather icon/snow.png';
    }
    else if(weatherid>701 && weatherid<=781){
        img.src = 'Weather icon/mist.png';
    }
    else if(weatherid==800){
        img.src = 'Weather icon/clear sky.png';
    }
    else if(weatherid==801){
        img.src = 'Weather icon/few clouds.png';
    }
    else if(weatherid==802 || weatherid==804){
        img.src = 'Weather icon/scattered clouds.png';
    }
    else if(weatherid==803){
        img.src = 'Weather icon/broken clouds.png';
    }
}