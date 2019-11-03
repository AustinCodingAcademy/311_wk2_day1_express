
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.use(bodyParser.json())

app.get("/users", (req, res) => {
	res.json( users )
});

app.post("/users", (req, res) => {

	let newUser =
	{
        "_id": users.length + 1,
        "name": "Kevin Jenkins",
        "occupation": "Gamer"
       
	}
	
	users.push( newUser );
	res.json( users[users.length - 1] );

	console.log(req.body);

});

app.delete("/users", (req, res) => {

	users.shift();
	res.sent("deleted");

});

app.get("/users/:usersId", (req, res) => {

	// res.json(users[0]);

	let user = users.find( e => e._id == req.params.usersId );

	res.json( user );

});

app.put("/users/:usersId", (req, res) => {

	// users[0].name = "Dan the man";
	// res.json( users[0] );

	let user = users.find( e => e._id == req.params.usersId );

	user.name = "Dan the man";
	res.json( user );

});

app.delete("/users/:usersId", (req, res) => {

	let user = users.find( e => e._id == req.params.usersId );

	user.isActive = false;
	res.send( `Deleted: ${user.name}` );

});


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))