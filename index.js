
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json())

const { users } = require('./state')
let counter = users.length;

/* BEGIN - create routes here */

// Part 1: Basic routes

app.get("/users", (req, res) => {
  res.json(users);
})

app.get("/users/1", (req, res) => {
  res.json(users[0]);
})

// Comment this out to get part 2 to work.
app.post("/users", (req, res) => {
  const newUser = {
    "_id": 6,
    "name": "Shrek",
    "occupation": "Ogre",
    "avatar": "https://pixabay.com/images/id-722415/"
  };
  users.push(newUser);
  res.json(users[users.length-1]);
});
// 

app.put("/users/1", (req, res) => {
  users[0].name = "Dave";
  res.json(users[0]);
});

app.delete("/users/1", (req, res) => {
  users.shift();
  res.send("deleted");
});

// Part 2: Body-parser module

app.post("/users", (req, res) => {
  console.log(req.body);
  let newUser = {
    _id: counter + 1,
    ...req.body
  };
  users.push(newUser);
  res.json(users);
});

// Part 3: Use path variables

app.get("/users/:userId", (req, res) => {
  let id = parseInt(req.params.userId);
  res.json(users[id - 1]);
});

app.put("/users/:userId", (req, res) => {
  let id = parseInt(req.params.userId);
  users[id - 1].name = req.body.name;
  res.json(users);
});

app.delete("/users/:userId", (req, res) => {
  let id = parseInt(req.params.userId);
  let arrInd = users.findIndex(users => users._id === id);
  users[arrInd].isActive = false;
  res.send("deleted");
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))