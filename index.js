
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length + 1
var bodyParser = require('body-parser')
app.use(bodyParser.json())

const extraUser = {
  "_id": 6,
  "name": "Argo Khon",
  "occupation": "Dog",
  "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
};

/* BEGIN - create routes here */
//GET /users
app.get("/users", (req, res) => {
  return res.json(users);
});

// GET /users/1
// app.get("/users/1", (req, res) => {
//   return res.json(users[0]);
// });

//POST /users
// app.post("/users", (req, res) => {
//   users.push(extraUser);
//   return res.json(users[users.length -1]);
// });
// PUT /users/1
// app.put("/users/1", (req, res) => {
//   const user = users[0];
//   user.occupation = "Retired";
//   return res.json(user);
// });
// DELETE /users/1
// app.delete("/users/1", (req, res) => {
//   users.splice(0, 1);
//   return res.send("deleted");
// });

//Give your server the ability to handle a POST request with a path "/users" and add the data from the client to the users array
app.post("/users", (req, res) => {
  const newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser);
  res.json(users)
  counter = counter + 1
  console.log(newUser)
});

//GET /users/1 => GET /users/:userId
app.get('/users/:id', (req, res) => {
  // store the id of the user request using the params of the req object coming from the client.
  const userId = req.params.id
  let foundUser = users.find(user => user._id == userId)
  console.log(userId, foundUser)
  res.json(foundUser)
})

//PUT /users/1 => PUT /users/:userId
app.put("/users/:id", (req, res) => {
  const userId = req.params.id
  let foundUser = users.find(user => user._id == userId)
  foundUser.occupation = "Retired";
  return res.json(foundUser);
});

//DELETE /users/1 => DELETE /users/:userId
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id
  let foundUser = users.find(user => user._id == userId)
  foundUser.isActive = false;
  return res.send("deleted");
  

});


/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))