
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
const { users } = require('./state')
let counter = users.length + 1

const newUser = {
"_id": 99,
"name": "John Doe",
"occupation": "Police",
"avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
}

// GET Method to get all users
app.get('/users',(req, res) => res.json(users))


// GET Method to get the user with the id 1
app.get('/users/1',(req, res) => res.json(users[0]))

app.get('/users/:userID', (req,res) => {
  let getUserId = req.params.userID;
  let user = users.find(u => u._id === Number(getUserId)) 
  res.send(user)
})


POST Method
app.post('/users',(req,res) => {
  users.push(newUser)
  res.json(users)
})

app.post('/users',(req,res) => {
const user = {
  _id : counter,
  name : req.body.name,
  occupation : req.body.occupation,
  avatar : req.body.avatar
}
users.push(user)
counter = counter + 1
res.json(users)
})

// PUT Method
app.put('/users/1',(req,res) => {
  const first = users[0]
  first.name = 'Bo Jackson'
  res.json(first)
})

app.put('/users/:userId',(req,res) => {
  let getUserId = req.params.userId;
  let user = users.find(u => u._id === Number(getUserId)) 
  user.name = req.body.name;
  console.log (req.body)
  console.log (user)
  res.send(user)
})

// DELETE Method
app.delete('/users/1',(req,res) => {
  users.splice(0,1)
  res.send('deleted')
})

app.delete('/users/:userId',(req,res) => {
  let getUserId = req.params.userId;
  let user = users.find(u => u._id === Number(getUserId)) 
  user.isActive = 'false';
  res.json('deleted')
})





/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))