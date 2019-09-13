const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4001;
const { users } = require("./state");
const counter = users.length;
/* BEGIN - create routes here */

app.use(bodyParser.json());

app.get("/users", (req, res) => {
	res.json(users);
});

app.get("/users/1", (req, res) => {
	res.json(users);
});

// app.post("/user", (req, res) => {
// 	return res.json(users);
// })

app.post("/users", function(req, res) {
	let user = req.body;
	user.id = counter;

	users.push(user);
	res.json(user);

	console.log(req.body);
});

// app.put("/users/1", (req, res) => {
// 	users[0].occupation = "Resident of The Black Lodge";
// 	res.send(users[0]);
// });

app.delete("/users/1", (req, res) => {
	users.pop();
	res.send("Deleted!");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
