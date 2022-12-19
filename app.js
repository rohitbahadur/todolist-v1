//jshint esversion:6
//setting up our server

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

//schema creation
const itemsSchema = {
	name: String
}

//model for schema
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
	name: "Apple"
});

const item2 = new Item({
	name: "Banana"
});
const item3 = new Item({
	name: "Mango"
});

//create a new array of items
const defaultItems = [item1, item2, item3];

const listSchema = {
	name: String,
	items: [itemsSchema]

};

const List = mongoose.model("List", listSchema);

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

	Item.find({}, function (err, foundItems) {
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Item Successfully Added");
				}
			});
			res.redirect("/");
		} else {
			res.render("list", { listTitle: day, newListItems: foundItems });
		}
	});
});

app.get("/:customeListName", function (req, res) {

	const customListName = req.params.customeListName;

	List.findOne({ name: customListName }, function (err, foundList) {
		if (!err) {

			if (!foundList) {
				const list = new List({
					name: customListName,
					items: defaultItems
				});
				list.save();
				res.redirect("/" + customListName);
			} else {
				res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
			}
		}
	});
});


// to add items in a form

app.post("/", function (req, res) {
	//add a new item, push the item back to server and from server back to browser (here the item get added on teh home route)
	const itemName = req.body.newItem;
	const listName = req.body.list;

	const item = new Item({
		name: itemName
	});

	if (listName === "Today") {
		item.save();
		res.redirect("/");
	} else {
		List.findOne({ name: listName }, function (err, foundList) {
			foundList.items.push(item);
			foundList.save();
			res.redirect("/" + listName)
		});
	}

});

app.post("/delete", function (req, res) {
	const checkedItemId = req.body.checkbox;
	Item.findOneAndDelete(checkedItemId, function (err) {
		if (!err) {
			res.redirect("/")
		}
	});
});



// we are listening the app @port 3000
app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
