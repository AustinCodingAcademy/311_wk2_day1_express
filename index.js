const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 4000;

const { users } = require("./state");

/* BEGIN - create routes here */

app.get("/users", (req, res) => {
  return res.json(users);
});

app.get("/users/1", (req, res) => {
  return res.json(users[0]);
});

app.post("/users", (req, res) => {
  let newUser = {
    _id: 6,
    name: "John Doe",
    occupation: "FBI Agent",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg",
  };
  users.push(newUser);
  let last = users.length - 1;
  return res.json(users[last]);
});

app.put("/users/1", (req, res) => {
  users[0].name = "Jane Doe";
  return res.json(users);
});

app.delete("/users/1", (req, res) => {
  users.splice(0, 1);
  res.send("deleted");
});

app.post("/users", (req, res) => {
  let counter = users.length;
  let newUser = req.body;
  newUser._id = counter + 1;
  users.push(newUser);
  let last = users.length - 1;
  return res.json(users[last]);
});

app.get("/users/:userId", (req, res) => {
  let id = req.params.userId;
  return res.json(users[id]);
});

app.put("/users/:userId", (req, res) => {
  let id = req.params.userId - 1;
  users[id].name = "Jane Doe";
  return res.json(users);
});

app.delete("/users/:userId", (req, res) => {
  let id = req.params.userId - 1;
  users[id].isActive = false;
  res.send("deleted");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
