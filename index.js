
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

//  Require the `body-parser` module on the line below `require('express')`.
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { users } = require('./state')

let counter = users.length + 1;

/* BEGIN - create routes here */

// get to return users 

app.get('/users', (req, res) => {
  res.json(users)
})

// get request for user by ID

app.get("/users/1", (req, res) => {
  return res.json(users[0]);
});

// post to add another user to the users array
app.post('/users', (req, res) => {
  myNewUser ={
    "_id": 6,
    "name": "Marshal Mathers",
    "occupation": "musician",
    "avatar": "https://www.nme.com/wp-content/uploads/2020/05/Eminem-listening-party-696x442.jpg"
  }
  users.push(myNewUser);
  return res.json(users);
})

app.put("/users/1", (req, res) => {
  users[0].occupation = "Walker";
  return res.json(users);
})

app.delete("/users/1", (req, res) => {
  users.splice(0, 1);
  res.send("deleted");
})

app.get("/users/:userId", (req, res) => {
  let id = req.params.userId;
  return res.json(users[id]);
})

app.put("/users/:userId", (req, res) => {
  let id = req.params.userId -1;
  users[id].name = "Will Smith";
  return res.json(users);
})

// // Give your server the ability to respond to a DELETE request with a path "/users/1" and remove the first item from the users array
app.delete("/users/:userId", (req, res) => {
    let newestId = req.params.userId - 1;
    users[newestId].isActive = false;
    res.send('deleted')
})

// Give your server the ability to handle a POST request with a path "/users" and add the data from the client to the users array
app.post('/users', (req, res) => {
  let user = req.body;
  user._id = counter
  users.push(user);
  let end = users.length -1;
  return res.json(users[end]);
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))