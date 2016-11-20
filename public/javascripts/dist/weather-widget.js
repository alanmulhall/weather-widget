(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WeatherWidget"] = factory();
	else
		root["WeatherWidget"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var APP_ID = '76dc88ee534303a679d5db850ed3f137';
	
	var WeatherWidget = function () {
		function WeatherWidget(settings) {
			var _this = this;
	
			_classCallCheck(this, WeatherWidget);
	
			Object.keys(settings).forEach(function (setting) {
				_this[setting] = settings[setting];
			});
			return this._getWeather().then(this._render.bind(this)).catch(function (e) {
				return console.log(e);
			});
		}
	
		_createClass(WeatherWidget, [{
			key: '_styleSheet',
			value: function _styleSheet() {
				return '\n\t\t\tp {\n\t\t\t\tcolor: red;\n\t\t\t}\n\t\t';
			}
		}, {
			key: '_buildIcon',
			value: function _buildIcon(icon, code) {
				var prefix = 'wi wi-';
				var today = new Date();
				var hour = today.getHours();
				var dayornight = void 0;
				if (hour > 6 && hour < 20) {
					dayornight = 'day-';
				} else {
					dayornight = 'night-';
				}
				return prefix + 'owm-' + dayornight + code;
			}
		}, {
			key: '_windTemplate',
			value: function _windTemplate(_ref) {
				var speed = _ref.speed;
	
				var units = this.units === 'metric' ? 'meter/sec' : 'miles/hour';
				if (this.showWind) {
					return '\n\t\t\t\t<p>wind: ' + speed + ' ' + units + '</p>\n\t\t\t';
				} else {
					return '';
				}
			}
		}, {
			key: '_template',
			value: function _template(_ref2) {
				var title = _ref2.title,
				    name = _ref2.name,
				    main = _ref2.main,
				    weather = _ref2.weather,
				    wind = _ref2.wind;
				var temp = main.temp;
				var _weather$ = weather[0],
				    description = _weather$.description,
				    icon = _weather$.icon,
				    id = _weather$.id;
	
				return '\n\t\t\t<style>\n\t\t\t\t@import url("/stylesheets/weather-icons.css");\n\t\t\t\t' + this._styleSheet() + '\n\t\t\t</style>\n\t\t\t<p class="title">\n\t\t\t\ttitle: ' + this.title + '\n\t\t\t</p>\n\t\t\t<p class="location">\n\t\t\t\tLocation: ' + name + '\n\t\t\t</p>\n\t\t\t<p class="tempature">\n\t\t\t\tTemp: ' + temp + '\n\t\t\t</p>\n\t\t\t<p class="description">\n\t\t\t\tDescription: ' + description + '\n\t\t\t</p>\n\t\t\t' + this._windTemplate(wind) + '\n\t\t\t<i class="' + this._buildIcon(icon, id) + '"></i>\n\t\t';
			}
		}, {
			key: '_getUsersGeoLocation',
			value: function _getUsersGeoLocation() {
				return new Promise(function (resolve, reject) {
					if ("geolocation" in navigator) {
						navigator.geolocation.getCurrentPosition(function (position) {
							return resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
						}, function (error) {
							return reject(error);
						}, {
							enableHighAccuracy: false,
							maximumAge: 1000 * 60 * 60
						});
					} else {
						return reject('Geolocation is unavailable');
					}
				});
			}
		}, {
			key: '_buildWeatherUrl',
			value: function _buildWeatherUrl(_ref3) {
				var _this2 = this;
	
				var lat = _ref3.lat,
				    lon = _ref3.lon;
	
				return new Promise(function (resolve, reject) {
					if (!lat || !lon) {
						return reject('Unable to get geolocation.');
					}
					return resolve('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=' + _this2.units + '&appid=' + APP_ID);
				});
			}
		}, {
			key: '_fetchWeather',
			value: function _fetchWeather(url) {
				return fetch(url).then(function (response) {
					return response.json();
				});
			}
		}, {
			key: '_getWeather',
			value: function _getWeather() {
				return this._getUsersGeoLocation().then(this._buildWeatherUrl.bind(this)).then(this._fetchWeather);
			}
		}, {
			key: '_render',
			value: function _render(data) {
				return this._template(data);
			}
		}]);
	
		return WeatherWidget;
	}();
	
	;
	
	exports.default = WeatherWidget;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=weather-widget.js.map