// How to test
// document.querySelectorAll('html /deep/ #message')[0].textContent (note: deep is depreciated)
const	APP_ID = '76dc88ee534303a679d5db850ed3f137';

// units=imperial
// units=metric
class WeatherWidget {

	constructor(settings) {
		Object.keys(settings).forEach(setting => {
			this[setting] = settings[setting];
		});
		return this._getWeather()
						.then(this._render.bind(this))
						.catch(e => console.log(e));
	}

	_styleSheet() {
		return `
			p {
				color: red;
			}
		`;
	}

	_buildIcon(icon, code) {
		const prefix = 'wi wi-';
		const today = new Date();
		const hour = today.getHours();
		let dayornight;
		if (hour > 6 && hour < 20) {
			 dayornight = 'day-';
		} else {
			 dayornight = 'night-';
		}
   return `${prefix}owm-${dayornight}${code}`;
	}

	_windTemplate({speed}) {
		const units = this.units === 'metric' ? 'meter/sec' : 'miles/hour';
		if (this.showWind) {
			return `
				<p>wind: ${speed} ${units}</p>
			`;
		} else {
			return '';
		}
	}

	_template({title, name, main, weather, wind}) {
		const {temp} = main;
		const {description, icon, id} = weather[0];
		return `
			<style>
				@import url("/stylesheets/weather-icons.css");
				${this._styleSheet()}
			</style>
			<p class="title">
				title: ${this.title}
			</p>
			<p class="location">
				Location: ${name}
			</p>
			<p class="tempature">
				Temp: ${temp}
			</p>
			<p class="description">
				Description: ${description}
			</p>
			${this._windTemplate(wind)}
			<i class="${this._buildIcon(icon, id)}"></i>
		`;
	}

	_getUsersGeoLocation() {
		return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(
					position => {
						return resolve({lat: position.coords.latitude, lon: position.coords.longitude});
					},
					error => reject(error),
					{
						enableHighAccuracy: false,
						maximumAge: 1000 * 60 * 60
					}
				);
		});
	}

	_buildWeatherUrl({lat, lon}) {
		return new Promise((resolve, reject) => {
			if (!lat || !lon) {
				return reject('Unable to get geolocation.');
			}
			return resolve(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${this.units}&appid=${APP_ID}`);
		});
	}

	_fetchWeather(url) {
		return fetch(url).then(response => response.json());
	}

	_getWeather() {
		return this._getUsersGeoLocation()
						.then(this._buildWeatherUrl.bind(this))
						.then(this._fetchWeather);
	}

	_render(data) {
		//console.log(JSON.stringify(data));
		return this._template(data);
		//let widget = document.querySelector(this.element).createShadowRoot();
		//return widget.innerHTML = this._template(data);
	}

};

export default WeatherWidget;
