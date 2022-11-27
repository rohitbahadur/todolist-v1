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
	if (currentDay === 6 || currentDay === 0) {
		day = "weekend"
	} else {
		day = "weekday"
	}
	res.render("list", { kindOfDay: day })
});

// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
