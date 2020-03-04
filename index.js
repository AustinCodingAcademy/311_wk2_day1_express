const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const { users } = require("./state");
let counter = users.length + 1;

/* BEGIN - create routes here */
//---------------------------------------

//Part 1
//get users
// app.get("/users", (req, res) => {
//   res.json(users);
// });

//get users/1
app.get("/users/1", (req, res) => {
  res.json(users[0]);
});

//post/ users

app.post("/users", (req, res) => {
  const newUser = {
    _id: 6,
    _name: "Rick",
    _occupation: "alcoholic",
    _avatar: "https://fillmurray.com/200/300"
  };
  users.push(newUser);
  res.json(users[users.length - 1]);
});

//put/users/1
app.put("/users/1", (req, res) => {
  users[0].name = "Tim";
  res.json(users[0]);
});

//delete users/1
app.delete("/users/1", (req, res) => {
  users.splice(0, 1);
  res.send("deleted");
});

// ---------------------------------------------------
//Part 2

app.post("/users", (req, res) => {
  users.push(req.body);
  users[users.length - 1]._id = counter;
  counter++;
  res.json(users);
  console.log(req.body);
});

//-------------------------------
//Part 3

app.get("/users/:userId", (req, res) => {
  const id = parseInt(req.params.userId);
  res.json(users[id - 1]);
});

app.put("/users/:userId", (req, res) => {
  const id = parseInt(req.params.userId);
  users[id - 1].name = req.body.name;
  users[id - 1].occupation = req.body.occupation;
  res.json(users);
});

app.delete("/users/:userId", (req, res) => {
  const id = parseInt(req.params.userId);
  let index = users.findIndex(users => users._id == id);
  users[index].isActive = false;
  res.send("deleted");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
