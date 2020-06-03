
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

// Get entire array
app.get('/users', (req, res) => res.json(users))

// Get single element from an array* work on this

app.get('/users/:_id', (req, res) => {
  res.json(users.find(user => {
    return +req.params._id === user._id
  }))
})

// create element in array (which requires body-parser middleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))