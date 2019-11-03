
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

// /* BEGIN - create routes here */
app.use(bodyParser.json())
app.get('/users', (req, res) => {
  console.log(req.params.id)
  console.log(req.params.athing)
  res.json(users);
})

app.get('/users/:id', (req, res) => {
  // const arrOfUsers = users
  const user = users.find(function (user) {
    if (user._id === Number(req.params.id))
      // console.log(user._id)
      return true
  })
  console.log(req.params.id)
  console.log(user)
  res.json(user);
})

app.post('/users', (req, res) => {
  // const arrOfUsers = users
  const newUser = {
    "_id": 6,
    "name": "Yoda",
    "occupation": "Jedi Master",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  }
  users.push(newUser)
  console.log(req.params.id)
  console.log(req.params.athing)
  res.json(newUser);
})
//I need to be able to update user 1 data and send it to user

app.put('/users/:id', (req, res) => {
  const user = users.find(function (user) {
    if (user._id === Number(req.params.id)) {
      user.name = req.body.name;
      user.occupation = req.body.occupation
      user.avatar = req.body.avatar
    }
    res.json({ message: "user updated", user })
  })
  console.log(user)

})

app.delete('/users/:id', (req, res) => {
  const user = users.find(function (user) {
    if (user._id === Number(req.params.id)) {
      users.shift()
    }
    res.json({ message: "user removed", users })
  })
})
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))