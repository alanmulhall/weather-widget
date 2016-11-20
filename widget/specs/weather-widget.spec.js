import sinon from 'sinon';
import chai from 'chai';
let expect = chai.expect;
import WeatherWidget from '../weather-widget';

global.navigator = {
		geolocation: {
				getCurrentPosition: () => {}
		}
};

describe("WeatherWidget", () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(WeatherWidget.prototype, '_getUsersGeoLocation').returns(new Promise(resolve => {
			return resolve({lat: 99.04, lon: 7.61});
		}));
	})

	context('Metric', () => {

		before(() => {
			let sandbox = sinon.sandbox.create();
			sandbox.stub(WeatherWidget.prototype, '_fetchWeather').returns(
				JSON.parse('{"coord":{"lon":99.04,"lat":7.61},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":25.52,"pressure":1010,"humidity":94,"temp_min":25,"temp_max":26},"visibility":7000,"wind":{"speed":2.6,"deg":30},"clouds":{"all":40},"dt":1479603600,"sys":{"type":1,"id":7952,"message":0.0026,"country":"TH","sunrise":1479597412,"sunset":1479639724},"id":6691842,"name":"Saladan","cod":200}')
			);
		});

		context('with wind', () => {

			it("has the correct title", (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: true});
				widget.then(data => {
					const title = !!data.match(/test/);
					expect(title).to.equal(true);
					done();
				});
			});

			it("has the correct location", (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: true});
				widget.then(data => {
					const location = !!data.match(/Saladan/);
					expect(location).to.equal(true);
					done();
				});
			});

			it("has the correct tempature", (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: true});
				widget.then(data => {
					const tempature = !!data.match(/25\.52/);
					expect(tempature).to.equal(true);
					done();
				});
			});

			it("has the correct description", (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: true});
				widget.then(data => {
					const description = !!data.match(/scattered clouds/);
					expect(description).to.equal(true);
					done();
				});
			});

			it("has the correct wind speed", (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: true});
				widget.then(data => {
					const wind = !!data.match(/2.6 meter\/sec/);
					expect(wind).to.equal(true);
					done();
				});
			});

			it("has the correct weather icon", (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: true});
				widget.then(data => {
					const icon = !!data.match(/wi wi-owm-day-802|wi wi-owm-night-802/);
					expect(icon).to.equal(true);
					done();
				});
			});

		});

		context('without wind', () => {
			it('does not display wind speed', (done) => {
				const widget = new WeatherWidget({title: 'test', units: 'metric', showWind: false});
				widget.then(data => {
					const description = !!data.match(/2.6 meter\/sec/);
					expect(description).to.equal(false);
					done();
				});
			});

		});

		after(() => {
			sandbox.restore();
		});

	});

	afterEach(() => {
		sandbox.restore();
	});

	after(() => {
		delete global.navigator;
	});
});
