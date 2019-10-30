
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

var counter = users.length+1

/* BEGIN - create routes here */
app.use(bodyParser.json ())

app.get('/users', (req, res) => {
  res.json(users);
})

app.get('/users/1', (req, res) => {
  res.json(users[0]);
})

let newUser = {
  "_id": 6,
  "name": "Alex Munoz",
  "occupation": "webDev",
  "avatar": "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
}; 

app.post('/users', (req, res) => {
  users.push(req.body); 
  let lastUser = users[users.length -1]
  lastUser._id = counter
  counter++
  console.log(req.body)
  res.json(lastUser)
})

app.get('/users', (req, res) => {
  res.json(users);
})

app.put('/users/1', (req, res) => {
users[0].name = 'Aaron'
res.json(users[0]);
})

app.delete('/users/1', (req, res) => {
  users.shift()
  res.send('User Deleted')
  // res.json(users)
})

app.get('/users/:userId', (req, res) => {
  let userIdent = parseInt(req.params.userId)
  let userIndex = parseInt(req.params.userId) - 1;
  
  for (let i = 0; i < users.length; i++) {
    if (i + 1 === userIdent)  {
      res.json(users[userIndex])
    }   
  }
})

app.put('/users/:userId', (req, res) => {
  let userIdent = parseInt(req.params.userId)
  let userIndex = parseInt(req.params.userId) - 1;

  let newUser = req.body

  for (let i = 0; i < users.length; i++) {
    if (i + 1 === userIdent)  {
      users._id = newUser._id ? newUser._id : users._id
      users.name = newUser.name ? newUser.name : users.name
      users.occupation = newUser.occupation ? newUser.occupation : users.occupation
      users.avatar = newUser.avatar ? newUser.avatar : users.avatar
      res.json(users[userIndex])
    }    
  }
})









/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))