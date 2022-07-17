let currentForecast = "https://api.weatherapi.com/v1/current.json?key=49c4c30fad944ae69ac180015221607&q="

const city = document.querySelector("#city");
const forecast = document.querySelector("#forecast");
const temp = document.querySelector("#temp");

const form = document.querySelector('form');
const search = document.querySelector("#search");
const errorBox = document.querySelector(".error")


//API Call
async function callAPI(url) {
	try {
		const response = await fetch(url, {mode: 'cors'});
		const data = await response.json();
		city.innerText = data.location.name + ", " + data.location.country;
		forecast.innerText = data.current.condition.text;
		errorBox.innerText = '';
		let tempC = data.current.temp_c;
		temp.innerText = tempC + '\u00B0' + " C";
		console.log(data)
	} catch(error) {
		errorBox.innerText = 'Location not found.\nSearch must be in the form of "City", "City, State/Province", "City, Country"';
	}
}

//Defualt
callAPI(currentForecast + "Toronto");

//Form capture
form.addEventListener('submit', () => {	
	event.preventDefault();
	let query = String(search.value);
	url = currentForecast + query;
	search.value = '';
	callAPI(url);
})