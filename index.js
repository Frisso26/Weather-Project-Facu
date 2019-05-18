window.addEventListener('load', geolocation);

let long;
let lat;
let locationTimezone = document.querySelector('.location-timezone');
let temperatureDegree = document.querySelector('.temperature-degree');

function geolocation(){
    if (navigator.geolocation){
        /*console.log("Si hay localización", navigator.geolocation)*/
        navigator.geolocation.getCurrentPosition(
            (position) => {
                callApi(position)
            }
        )
    }else{
        return alert("no se ha podido acceder a la geolozalizacion")
    }
}

async function callApi(position){
    long= position.coords.longitude;
    lat= position.coords.latitude;
    /*proxy:*/
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = `${proxy}https://api.darksky.net/forecast/2a79bcf88a374893ed30c41375f526a6/${lat},${long}`

    let apiCall= await fetch(apiURL)
    let dataJSON = await apiCall.json()

    console.log("dataJSON", dataJSON);
    setWeatherData(dataJSON)
}

function setWeatherData(data){
    locationTimezone.textContent = data.timezone;
    temperatureDegree.textContent = data.currently.temperature
}

