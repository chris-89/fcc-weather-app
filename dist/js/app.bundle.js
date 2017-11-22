(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _templates = require('./templates.js');

var _templates2 = _interopRequireDefault(_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//endpoint
var url = 'https://fcc-weather-api.glitch.me/api/current?';

var weatherData = {},
    tempUnit = void 0,
    tempCels = void 0,
    tempFahr = void 0,
    place = void 0,
    country = void 0,
    temp = void 0,
    disc = void 0,
    refresh = void 0,
    app = document.getElementById('weather-app');

function cacheDom() {
    tempUnit = document.getElementsByClassName('temp-unit'), tempCels = document.getElementById('cels'), tempFahr = document.getElementById('fahr'), place = document.getElementById('place'), country = document.getElementById('country'), temp = document.getElementById('temp'), disc = document.getElementById('disc'), refresh = document.getElementById('refresh');
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
    tempCels.addEventListener('click', function () {
        changeUnit();
    });
    tempFahr.addEventListener('click', function () {
        changeUnit();
    });
    refresh.addEventListener('click', function () {
        init();
    });
}

function getApi() {
    return new Promise(function (res, rej) {
        getLocation().then(function (pos) {
            var lat = pos.coords.latitude,
                lon = pos.coords.longitude;
            return fetch(url + 'lat=' + lat + '&lon=' + lon).then(function (data) {
                return res(data.json());
            }).catch(rej);
        });
    });
}

function getLocation() {
    return new Promise(function (res, rej) {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

function init() {
    getApi().then(function (data) {
        render(app, _templates2.default.weather(data));
        cacheDom();
        bindEvents();
    });
}

function render(target, value) {
    target.innerHTML = value;
}

init();

},{"./templates.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var template = {
    weather: function weather(context) {
        return "\n        <div id='location'>\n            <p id='place'>" + context.name + "</p>\n            <p id='weather-disc'>" + context.weather[0].description + "</p>\n        </div>\n           <div id='icon-wrapper'>\n            <div id='icon' class=\"" + context.weather[0].main.toLowerCase() + "\"></div>\n            </div>\n            <div id='temp'>" + context.main.temp.toFixed(1) + "</div>\n        <div id='unit-wrapper'>\n            <div id='cels' class='active'>C\xB0</div>\n            <div id='fahr' class='inactive'>F\xB0</div>\n        </div>\n        <div id='refresh'>\n            <i class='fa fa-refresh'></i>\n        </div>\n        ";
    }
};

exports.default = template;

},{}]},{},[1]);
