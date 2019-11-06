// Tucker Lavell
// CS290 - Spring 2018
// Week6 - AJAX
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('zipSubmit').addEventListener('click', function(){	
		getByZip();
		event.preventDefault();
	});
	document.getElementById('cityStateSubmit').addEventListener('click', function() {
		getByCityState();
		event.preventDefault();
	});
	document.getElementById('dataSubmit').addEventListener('click', function() {
		doHttpBin();
		event.preventDefault();
	});
}

function getByZip() {
	var zipCode = document.getElementById("zipCode").value;
	var payload = "zip=" + zipCode + ",us";
	getWeather(payload);
}

function getByCityState() {
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var payload = "q=" + city + ",us";
	getWeather(payload);
}

function getWeather(payload) {
	// my api key for openweathermap
	var apiKey = "ab7fe912fdd1f5d454152ecb237b99bc";
	var fullPayload = payload + "&appid=" + apiKey;
	var req = new XMLHttpRequest();
	req.open("GET", "http://api.openweathermap.org/data/2.5/weather?" + fullPayload, true);
	// ajax request
	req.addEventListener("load", function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			document.getElementById("cityResult").textContent = response.name;
			document.getElementById("tempResult").textContent = response.main.temp;
			document.getElementById("humidityResult").textContent = response.main.humidity;
		}
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});	
	req.send(null);
}

function doHttpBin() {
	var req = new XMLHttpRequest();
	var payload = {data:null};
	payload.data = document.getElementById("data").value;
	req.open("POST", "http://httpbin.org/post", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			var test = JSON.parse(response.data);
			document.getElementById("dataResult").textContent = test.data;
		} else {
			console.log("Error in network request: " + req.statusText);
		}});
	req.send(JSON.stringify(payload));
}