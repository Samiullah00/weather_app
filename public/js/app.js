var fetchweather = "/weather";

const weatherform = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon');

const weatherCondition = document.querySelector('.weatherCondition');

const temElement = document.querySelector('.temperature span');

const placeElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');



const monthnames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobor", "November", "December"];

dateElement.textContent = new Date().getDate() + " , " + monthnames[new Date().getMonth()].substring(0, 3);

weatherform.addEventListener('submit', (event) => {
    event.preventDefault();

    placeElement.textContent = "Loading....";
    temElement.textContent = "";
    weatherCondition.textContent = "";
    const locationapi = fetchweather + "?address=" + search.value;
    fetch(locationapi).then(response => {
        response.json().then(data => {
            if (data.error) {
                placeElement.textContent = data.error;
                temElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                // if (data.description === "rain" || data.description === "fog") {
                //     weatherIcon.className = ".wi wi-day-" + data.description
                // } else {
                //     weatherIcon.className = ".wi wi-day-cloudy"
                // }
                placeElement.textContent = data.cityname;
                temElement.textContent = (data.temprature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    })

});