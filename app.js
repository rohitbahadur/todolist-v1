//jshint esversion:6
//setting up our server

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
	//use Date method from java script to get day.

	var today = new Date();
	var options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit"
	}

	var day = today.toLocaleDateString("en-EU", options)

	res.render("list",
		{ kindOfDay: day })
});

// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
