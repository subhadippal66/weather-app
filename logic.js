let lat;
let lon;
let tempInC;


const tempText= document.querySelector(".temp-deg");
const citynameText = document.querySelector(".location-timezone");
const desc = document.querySelector(".temp-description");
const country = document.querySelector(".country");

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
                })
                .catch(e=>{
                console.log("error :",e)
                })
        })
    }
    
    
}