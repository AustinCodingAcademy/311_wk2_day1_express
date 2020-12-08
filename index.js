
const { response } = require('express')
const express = require('express')
const bodyParser = require(`body-parser`)
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const counter = users.length

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  return res.json(users)
})
app.get('/users/1', (req, res) => {
  return res.json(users[0])
})

app.post('/users', (req, res) => {
  let user =     
  {
    "_id": 6,
    "name": "Claire Sheek",
    "occupation": "Tap Dancer",
    "avatar": "https://images.app.goo.gl/PrEpvpFnF1Cc61Jc7"
  }
  users.push(user)
  return res.json(users)
})

app.put('/users/1', (req, res) => {
  let currentUser = users[0]
  currentUser.name = "John Doe"
  return res.json(currentUser.name)
})

app.delete('/users/1', (req, res) => {
  users.splice(0,1)
  res.send("Deleted")
  // return res.json(users)
})

app.post('/users', (req, res) => {
  let user = req.body
  
  users.push(user)
  return res.json(users)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))