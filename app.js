//jshint esversion:6
//setting up our server

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
	//use Date method from java script to get day.

	var day = new Date();
	var currentDay = day.getDay();
	var day = "";

	switch (currentDay) {
		case 0:
			day = "Sunday"
			break;
		case 1:
			day = "Monday"
			break;
		case 2:
			day = "Tuesday"
			break;
		case 3:
			day = "Wednesday"
			break;
		case 4:
			day = "Thursday"
			break;
		case 5:
			day = "Friday"
			break;
		case 6:
			day = "Saturday"
			break;
		default:
			console.log("Error: current day is equal to: " + currentDay)
	}

	res.render("list", { kindOfDay: day })
});

// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
