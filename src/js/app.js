'use strict';

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
    refresh,
    app = document.getElementById('weather-app');

function cacheDom() {
        tempUnit = document.getElementsByClassName('temp-unit'),
        tempCels = document.getElementById('cels'),
        tempFahr = document.getElementById('fahr'),
        place = document.getElementById('place'),
        country = document.getElementById('country'),
        temp = document.getElementById('temp'),
        disc = document.getElementById('disc'),
        refresh = document.getElementById('refresh');
}

function changeUnit() {
    if (tempCels.className.includes('active')) {
        alert('changing className');
        tempCels.className === 'inactive';
        tempFahr.className === 'active';
    } else {
        tempCels.className === 'active';
        tempFahr.className === 'inactive';
    }
}

function bindEvents() {
    tempCels.addEventListener('click', function(){
        changeUnit();
    });
    tempFahr.addEventListener('click', function(){
        changeUnit();
    });
    refresh.addEventListener('click', function() {
        init();
    });
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
            render(app, template.weather(data));
            cacheDom();
            bindEvents();
        })
}


function render(target, value) {
    target.innerHTML = value;
}


init();
