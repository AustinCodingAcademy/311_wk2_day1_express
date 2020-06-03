
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length;

/* BEGIN - create routes here */
app.use(bodyParser.json())

app.get('/users', (req, res) => res.json(users))

app.get('/users/:userId', (req, res) => {
  let _userId = req.params.userId
  return res.json(users[_userId-1])
})
// app.post('/users', (req, res) => res.json(users[users.length-1]))

app.put('/users/:userId', (req, res) => {
  let _userId = req.params.userId
  users[_userId-1].name = "Tyler Durden"
  return res.json(users[_userId-1])
})

app.delete('/users/:userId', (req, res) => {
  let _userId = req.params.userId
  var index = users.findIndex((person) => {
    return person._id == _userId;
  })
  users[index]["isActive"] = false;
  res.send('deleted');
})

app.post('/users', (req, res) => {
  counter++;
  req.body["_id"] = counter;
  users.push(req.body)
  res.json(req.body)
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))