
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
})
app.get('/users/1', (req, res) => {
  res.json(users[0])
})

let newUser = {user:"Charlie Brown"};

app.post('/users', function (req, res) {
  res.json(newUser)
})

app.put('/users/1', function (req, res) {
  res.json(users[0])
})

app.delete('/users/1', function (req, res) {
  res.send("DELETED")
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))