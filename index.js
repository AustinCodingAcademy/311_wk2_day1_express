const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");
const jsonParser = bodyParser.json();
let count = users.length + 1;

/* BEGIN - create routes here */
// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});
// Get single user by id
app.get("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let found = users.find(user => user._id === id);
  if (found)
    res.json(found);
  else
    res.status(400).send(`There is no user with id: ${id}`);
});
// Post a new user from body of client input
app.post("/users", jsonParser, (req, res) => {
  const newUser = {
    _id: count,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser);
  count++;
  res.json(newUser);
});
// Update a current user
app.put('/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let found = users.find(user => user._id === id)
  if (found) {
    found.occupation = "poop scooper";
    res.json(found);
  }
  else
    res.status(400).send(`There is no user with id: ${id}`);
})
// Make a user inactive
app.delete('/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let found = users.find(user => user._id === id);
  if (found) {
    found.isActive = false;
    res.send('deleted');
  }
  else
    res.status(400).send(`There is no user with id: ${id}`);
  // *** Alternative code - delete the user entirely.
  // let found = users.findIndex(user => user._id === id);
  // if (found !== -1) {
  //   users.splice(found, 1);
  //   res.send('deleted.');
  // }
  // else
  //   res.status(400).send(`There is no user with id: ${id}`);
})
/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
