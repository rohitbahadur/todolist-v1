//jshint esversion:6
//setting up our server

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
	//sending the browser the word hello when the user access the home route which is / in here (res is teh response from our server)

	var day = new Date();
	var currentDay = day.getDay();

	if (currentDay === 6 || currentDay === 0) {
		res.write("<h1>Yay! it weekend</h1>")
	} else {
		res.write("<p> Oh No, its weekeday <p>")
		res.write("<h1> I have to work </h1>")
	}
	res.send();
});

// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
