//jshint esversion:6
//setting up our server

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy food", "Cook food", "Eat food"]
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
	//use Date method from java script to get day.
	var today = new Date();
	//js object to create a day with seeking information 
	var options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit"
	}

	var day = today.toLocaleDateString("en-ll", options)

	res.render("list",
		{ kindOfDay: day, newListItems: items })
});

// to add items in a form
app.post("/", function (req, res) {
	//add a new item, push the item back to server and from server back to browser (here the item get added on teh home route)
	var item = req.body.newItem
	items.push(item);
	res.redirect("/");

	//console.log(item)
})

// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
