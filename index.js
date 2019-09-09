const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const { users } = require("./state");

/* BEGIN - create routes here */
let Counter = 6;
app.use(bodyParser.json());

app.get("/users", (req, res) => {
	return res.json(users);
});

app.get("/users/1", (req, res) => {
  return res.json(users[0]);
  


});


// part 2
app.post("/users", (req, res) => {
	Counter = 1 + Counter;
	let hardCode = {
		_id: Counter,
		name: "seanDale Deshazer",
		occupation: "Couch Potatoe",
		avatar: "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  };
	users.push(hardCode);
	res.json(hardCode);
	console.log(req.body);
});

app.get("/users", (req, res) => {
	return res.json(users);
});

app.put("/users/1", (req, res) => {
	users[0].name = "sean";
	res.json(users[0]);
});

app.delete("/users/1", (req, res) => {
	users[0]._id = null;
	res.send("DELETE");
});


// part 3

app.get("/users/:userId", (req, res) => {
  users.push(hardCode);
	res.json(users);
	console.log(req.route);
});


app.put('/users/:userId', (req, res) => {
  let id = users.filter(x => x._id == req.params.userId);
  id[0].name = 'Britney Spears';
  res.json(id[0]);
})
app.delete('/users/:userId', (req, res) => {
  let id = users.filter(x => x._id == req.params.userId);
  let name = id[0].name;
  id[0].isActive = false;
  res.send(`Deleted User ${name}`);
})
/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
