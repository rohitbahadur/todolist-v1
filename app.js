//jshint esversion:6
//setting up our server

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	//use Date method from java script to get day.
	let today = new Date();

	//js object to create a day with seeking information 
	let options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit"
	}

	let day = today.toLocaleDateString("en-ll", options)

	//we pass in two variables kindOfDay and newListItems which we have in our ejs file

	res.render("list", { listTitle: day, newListItems: items })

});

// to add items in a form

app.post("/", function (req, res) {
	//add a new item, push the item back to server and from server back to browser (here the item get added on teh home route)
	let item = req.body.newItem
	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(items);
		res.redirect("/")
	}

	//console.log(item)
});

app.get("/work", function (req, res) {
	res.render("list", { listTitle: "Work List", newListItems: workItems })
})




// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
