const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");

let counter = users.length + 1;

/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/1", (req, res) => {
  res.json(users[0]);
});

app.post("/users", (req, res) => {
  let newUser = {
    _id: 6,
    name: "Corey Tyler",
    occupation: "Bartender",
  };
  users.push(newUser);
  res.json(users[5]);
});

app.put("/users/1", (req, res) => {
  users[0].occupation = "Pit Boss";
  res.json(users[0]);
});

app.delete("/users/1", (req, res) => {
  users[0]._id = null;
  res.send("DELETED");
});

app.post("/users", (req, res) => {
  let hardCode = {
    _id: counter,
    name: "Quan",
    occupation: "Fighter Pilot",
  };
  users.push(hardCode);
  res.json(hardCode);
  console.log(req.body);
});

app.get("/users/:id", (req, res) => {
  const found = users.some((user) => user._id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter((user) => user._id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "Member not found" });
  }
});

app.put("/users/:userId", (req, res) => {
  let id = users.filter((user) => user._id == req.params.userId);
  id[0].name = "Britney Spears";
  res.json(id[0]);
});

app.delete("/users/:id", (req, res) => {
  let id = users.filter((users) => users._id == req.params.userId);
  let name = id[0].name;
  id[0].isActive = false;
  res.send(`Deleted User ${name}`);
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
