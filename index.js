
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

let newUser = {
  "_id": 6,
  "name": "Bert Macklin",
  "occupation": "FBI Agent",
  "avatar": "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
}

app.post('/users', (req, res) => {
  users.push(newUser)
  let lastUser = users[users.length-1]
  res.json(lastUser)
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.put('/users/1', (req, res) => {
  name = req.body.name;
})





/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))