
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length;
console.log(counter);

/* BEGIN - create routes here */


// ###### PART 1: BASIC ROUTES ######

app.get('/', (req, res) => {
  res.send("Hello World");
})

// Get request to return users array
//
app.get("/users", (req, res) => {
  res.json(users);
})

// Get request to return user by ID number
//
app.get("/users/:id", (req, res) => {
  let id = req.params.id -1;
  res.json(users[id]);
})

// Post request to add new user to users array
//
app.post("/users", (req, res) => {
  let newUser = {
    "id": 6,
    "name": "Sean Evans",
    "occupation": "Wing-tester",
    "avatar": "Photo-of-Sean-Evans"
  }
  users.push(newUser)
  res.json(users);
})

// Put request to modify user1 of array of users
//
app.put("/users/:id", (req, res) => {
  let id = req.params.id -1;
  users[id].name = "Dale Doback";
  users[id].occupation = "Sailor";
  res.json(users[id]);
})

// Delete request to remove user from array
//
app.delete("/users/:id", (req, res) => {
  let id = req.params.id -1;
  users.splice(id, 1);
  users[id].isActive = "false";
  res.json(users[id]);
  res.send('deleted');
})


// ###### PART 2: BODY PARSER MODULE ######

app.use(bodyParser.json())

// Handle post request for path 'users', and add
// the data from the client to the user array
//
// app.post('/users', (req, res) => {
//   req.body._id = counter+1;
//   users.push(req.body);
//   res.json(users[counter]);
// })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))