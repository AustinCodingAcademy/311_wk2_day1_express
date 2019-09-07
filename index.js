
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const port = process.env.PORT || 4000
const { users } = require('./state')

/* BEGIN - create routes here */
let counter = users.length;

app.use(bodyParser.json());

app.get('/users',(req, res) => {
  res.json(users)
  console.log(`number of users: ${counter}`)
});

app.get('/users/1',(req, res) => {
  return res.json(users[0])
});

app.post('/users',(req, res) => {

  console.log(req.body)

  let newPerson = {
    "_id": counter + 1,
    "name": "Luke Bryan",
    "occupation": "Country Artist",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  };
  users.push(newPerson);
  res.json(users[users.length - 1])
})

app.get('/users',(req, res) => {
  return res.json(users)
});

app.put('/users/1', (req, res) => {
  users[0].name = 'Jay Leno'
  res.json(users[0])
})

app.delete('/users/1', (req, res) => {
  users.shift()
  res.send('deleted')
})

// third section

app.get("/users/:userId", (req, res) => {
  let id = users.filter (x => x._id == req.params.userId)
  res.json(id[0])
})

app.put("/users/:userId", (req, res) => {
  let id = users.filter (x => x._id == req.params.userId)
  id[0].name = "Jed Bartlet"
  res.json(id[0])
})

app.delete("/users/:userId", (req, res) => {
  let id = users.filter (x => x._id == req.params.userId)
  id[0].isActive = false;
  res.send("deleted")
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))


// app.post('/users',(req, res) => {
  // POST = adding something
  // adding something = array.push()
  // a hard coded object
// })