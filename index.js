
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

// ## Part 1: Basic routes

// GET /users
app.get('/users', (req, res) => res.json(users))

// GET /users/1
app.get('/users/:_id', (req, res) => {
  res.json(users.find(user => {
    return +req.params._id === user._id
  }))
})

//* Body-Parser for Post & Put (npm i body-parser)
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// POST /users

app.post('/users', (req, res) => {
  const newUser = {
    _id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  
  users.push(newUser)
  res.json(newUser)
})

// PUT /users/1
app.put('/users/:_id', (req, res) => {
  const updatedMember = req.body
  users.forEach(user => {
    if (user._id === +req.params._id ) {
      user.name = updatedMember.name
      res.json({ msg: 'User name updated', user})
    }
  })
})

// DELETE /users/1
app.delete('/users/:_id', (req, res) => {
  for (let i=0; i<users.length; i++) {
    if (users[i]._id === +req.params._id) {
      users[i].isActive = "False"
      res.send('deleted')
    }
  }  
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))