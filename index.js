const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { users } = require("./state");

/* BEGIN - create routes here */
// * GET /users
// * Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
// * Ex. `res.json(users)`

//added to Postman
// const newUser = {
// 	_id: counter + 1,
//   name: "Eli Tomac",
//   occupation: "Motocross Pro",
//   avatar: "http://elitomac.com/"
// };

app.get("/users", (req, res) => res.json(users));

// * GET /users/1
//     * Give your server the ability to respond to a GET request with a path "/users/1" and return the first user object from the users array from state.js
// * GET /users/1 => GET /users/:userId
// * Give your server the ability to respond to a GET request with a path `/users/:userId` and return the user object from the users array that has the _id == userId

app.get("/users/:id", (req, res) => {
	//The some() method executes the callback function...returns a truthy
	let findUser = users.find((user) => user._id == req.params.id);
	if (findUser) {
		res.send(findUser);
	} else {
		res.send(`message: ${req.params.id} Not Found`);
	}
});
// app.get ('/users/:id', (req,res) => {
// * POST /users
// * Give your server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js. Use `res.json()` to send the last user in the array (should be the new one) back to the client.
// * If you do another GET request you should see this added
// // * You will need to create the hard coded user mentioned above

// * Give your server the ability to handle a POST request with a path "/users" and add the data from the client to the users array
//   * This means you will be adding `req.body`. Console log this to see what you get and don't forget to send an actual body with the request in Postman
//   * Assign an _id property to the user object that is a number that increments by 1 each time.
//     * To do this, set a variable called counter near the `{ users }` variable. Start it at the length of the users array
//   * Use `res.json()` to send the user object back to the client. (if you do another GET request you should see this added)

app.post("/users/", (req, res) => {
	//increments the user id as users are added
	let counter = users.length + 1;
	let newUser = {
		_id: counter,
		name: req.body.name,
		occupation: req.body.occupation,
		avatar: req.body.avatar
	};

	users.push(newUser);
	res.json(users[users.length - 1]);
});

// * PUT /users/1
// * Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value (ex. name, occupation) on the first user object in the users array in state.js. Use `res.json()` to send this user back to the client.
// * GET /users/1 => GET /users/:userId

// * PUT /users/1 => PUT /users/:userId
// * Give your server the ability to respond to a PUT request with a path `/users/:userId` and just change any key value on the user object with this _id

app.put("/users/:id", (req, res) => {
	// find the id
	const findUser = users.find((user) => user._id == req.params.id);
	// if found change the name
	if (findUser) {
		// find the id & change the name
		users.find((user) => user._id == req.params.id).name = req.body.name;
	}
	//return the changed user
	res.json(findUser);
});
// users.find((v) => v._id == req.params.id).name = "Ricky Bobby";

// * DELETE /users/1
// * Give your server the ability to respond to a DELETE request with a path "/users/1" and remove the first item from the users array. Use `res.send()` to send back a messsage, "deleted"

// * DELETE /users/1 => DELETE /users/:userId
// * Give your server the ability to respond to a DELETE request with a path `/users/:userId` and find the user with this id from the array. Give this user object a new key value `isActive: false`. Use `res.send()` to send back a messsage, "deleted"

app.delete("/users/:id", (req, res) => {
	const findUser = users.find((user) => user._id == req.params.id);
	findUser.isActive = "false";

	// added to reveiw new key:value
	// res.json(users);
	res.send(`User:${req.params.id} deleted`);
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// let user = users.find((user) => user._id === parseInt(req.params.id));
