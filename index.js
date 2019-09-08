const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
// first express
const { users } = require("./state");
let counter = users.length;

/* BEGIN - create routes here */
app.get("/users", (req, res) => {
	return res.json(users);
});
app.get("/users/1", (req, res) => {
	return res.json(users[0]);
});
app.post("/users", (req, res) => {
	let newObject = {
		_id: 6,
		name: "guy",
		occupation: "thing",
		avatar: "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
	};
	users.push(newObject);
	res.send(newObject);
	// console.log(req.body);
	// res.json(counter);
});
app.put("/users/1", (req, res) => {
	users[0].name = "dave";
	res.send(users[0]);
});
app.delete("/users/1", (req, res) => {
	users.shift();
	res.send("deleted");
});

// app.get("/users/1", (req, res) => {});
app.use(bodyParser.json());
app.post("/users", (req, res) => {
	res.send(req.body);
});
app.get("/users/:userId", (req, res) => {
	let newThing = users.some(user => user._id === parseInt(req.params.userId));
	if (newThing) {
		res.json(users.filter(user => user._id === parseInt(req.params.userId)));
	}
	res.json("did not work");
});
app.put("/users/:userId", (req, res) => {
	newThing = users.some(user => user._id === parseInt(req.params.userId));
	if (newThing) {
		const updateUser = req.body;
		users.forEach(user => {
			if (user._id === parseInt(req.params.userId)) {
				user.name = updateUser.name ? updateUser.name : user.name;
				res.json("changed");
			}
		});
		res.json(users.filter(user => user._id === parseInt(req.params.userId)));
	}
	res.json("did not work");
});
app.delete("/users/:userId", (req, res) => {
	newThing = users.some(user => user._id === parseInt(req.params.userId));
	if (newThing) {
		res.json({
			msg: "deleted",
			users: users.filter(user => user._id !== parseInt(req.params.userId))
		});
	}
	res.json("did not work");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
