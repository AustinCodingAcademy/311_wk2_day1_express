
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')

const { users } = require('./state')

/* BEGIN - create routes here */

// Enable body parser for application/json
app.use(bodyParser.json())

// Route to get all users
app.get('/users', (req, res) => {
  res.json(users)
})

// Route to get single user
app.get('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  res.json(user)
})


// Route to make a post
app.post('/users', (req, res) => {
  const newUser = {
    _id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser)
  res.json(users)
})


// Update user
app.put('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  const updateUser = req.body;
  users.user.id;
})


// Delete user
app.delete('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  res.send('User Deleted')
  res.json(users)
})




/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))