
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
require 

const { users } = require('./state')

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  return res.json(users)
})

app.get('/users/1', (req, res) => {
  return res.json(users[0])
})

app.post('/users', (req, res) => {
  let user = {
    "_id": 6,
    "name": "Hugh Jackman",
    "occupation": "Actor",
    "avatar": "http://www.gstatic.com/tv/thumb/persons/171234/171234_v9_bc.jpg"
  }
  users.push(user)
  return res.json(users)
})

app.put('/users/1', (req, res) => {
  let myUser = users[1]
  myUser.name = "Stanley Musial"
  return res.json(myUser.name)
})

app.delete('/users/1', (req, res) => {
  users.splice(0,1)
  res.send("Deleted")
  return res.json(users)
})

app.post('/users', (req, res) => {
  console.log(req.body)
  req.body._id = counter + 1
  users.push(req.body)
  return res.json(users)
})

app.get('/users/:userId', (req, res) => {
  let idNum = req.params.userId -1
  return res.json(users[idNum])
})

app.put('users/:userId', (req, res) => {
  let idNum = req.params.userId -1
  users[idNum].name = "Walter Farruko"
  return res.json(users[userId])
})

app.delete('/users/:userId', (req, res) => {
  let idNum = req.params.userId -1
  users[idNum].isActive = false
  res.send("Deleted")
  return res.json(users)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))