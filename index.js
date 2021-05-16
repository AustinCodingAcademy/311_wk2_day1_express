
const { query } = require('express');
const express = require('express');
const app = express()
const port = process.env.PORT || 4000
app.use(express.json());

const { users } = require('./state')
var counter = users.length;


/* BEGIN - create routes here */

app.get('/users/:userID', function(req, res, next) {
res.json(users[req.params.userID - 1]);
})

app.get('/users/1', function (req, res) {
  
})

app.post('/users/:userID', function (req, res) {
  console.log(req.body)

  const newUser = {
    "_id" : req.body._id,
    "name" : req.body.name
  }

  users.push(newUser);
  res.json(users[counter]);
})

app.put('/users/:userID', function (req, res) {
  var userID = req.params.userID;
  
  users[userID]._id = req.body._id;
  users[userID].name = req.body.name;

  res.json(users[userID]);

})

app.delete('/users/:userID', function (req, res) {
  var userID = req.params.userID;

  users[userID].isActive = "false";
  res.send('deleted');

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))