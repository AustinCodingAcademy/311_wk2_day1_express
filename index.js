
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req, res) =>{
  return res.send(users)
})

app.get('/users/1', (req, res) =>{
  return res.json(users[0])
})

app.post('/users', (req, res) =>{
  let userSix = {
    "_id": 6,
    "name": "Faye Valentine",
    "occupation": "Bounty Hunter",
    "avatar": "https://static.wikia.nocookie.net/cowboybebop/images/3/3a/G89kyozspj831.jpg/revision/latest/top-crop/width/360/height/450?cb=20191201005133"
  };
  users.push(userSix)
  let end = users.length -1;
  return res.json(users[end])
})

app.put('/users/1', (req, res) => {
  users.occupation[0] = "Coder";
  return res.json(users);
})

app.delete('/users/1', (req, res) => {
  users.splice(0, 1) //splice starting at index 0 and only up to index 1
  res.send('deleted')
})

app.post('/users', (req, res) =>{
  let newUser = req.body;
  let counter = users.length;
  newUser._id = counter + 1;
  users.push(newUser);
  let end = users.length - 1;
  return res.json(users[end])
})

app.get('`/users/:userId`', (req, res) =>{
  let id = req.params.userId;
  return res.json(users[id]);
})

app.put('`/users/:userId`', (req, res) =>{
  let id = req.params.userId - 1;
  users[id].name = "Faye Valentine";
  return res.json(users)
})

app.delete('`/users/:userId`', (req, res) =>{
  let newId = req.params.userId - 1;
  users[newId].isActive = false;
  res.send('deleted')
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))