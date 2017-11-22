import template from './templates.js';

//endpoint
const url = 'https://fcc-weather-api.glitch.me/api/current?';

let weatherData = {},
    tempUnit,
    tempCels,
    tempFahr,
    place,
    country,
    temp,
    disc,
    app = document.getElementById('weather-app');

function cacheDom() {
        tempUnit = document.getElementsByClassName('temp-unit'),
        tempCels = document.getElementById('cels'),
        tempFahr = document.getElementById('fahr'),
        place = document.getElementById('place'),
        country = document.getElementById('country'),
        temp = document.getElementById('temp'),
        disc = document.getElementById('disc');
}

function changeUnit() {
    if (cels.className === 'active') {
        cels.className === 'inactive';
        fahr.className === 'active';
    } else {
        cels.className === 'active';
        fahr.className === 'inactive';
    }
}

function bindEvents() {
    //tempUnit.addEventListener('click', changeUnit);
    //refresh.addEventListener('click', refresh);
}

function getApi() {
    return new Promise((res, rej) => {
        getLocation()
            .then((pos) => {
            const   lat = pos.coords.latitude,
                    lon = pos.coords.longitude;
                return fetch(`${url}lat=${lat}&lon=${lon}`)
                        .then((data) => res(data.json()))
                        .catch(rej);
        }
    )
    })
}

function getLocation() {
    return new Promise((res,rej) => {
    navigator.geolocation.getCurrentPosition(res,rej)
});
}

function init() {
    getApi()
        .then((data) => {
            console.log(data);
            render(app, template(data));
            cacheDom();
            bindEvents();
        })
}

function refresh() {
    getApi();
}

function render(target, value) {
    target.innerHTML = value;
}

init();
