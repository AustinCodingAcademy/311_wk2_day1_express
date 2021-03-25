
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const counter = users.length

app.use(bodyParser.json())
/* BEGIN - create routes here */

// ************************ PART 1 ****************************
//GET /users
app.get('/users',(req,res)=> {
  res.json(users)
});

//GET /users/1
app.get('/users/1', (req, res) => {
  return res.json(users[0])
})

//Post/user
app.post('/users/', (req, res) => {

  let user = 
  {
    "_id": 6,
    "name": "Pillsbury Doughboy",
    "occupation": "Professional Baker",
    "avatar": "https://www.pillsbury.com/doughboy"
  }
  users.push(user)
  return res.json(users)
})

// PUT /users/1
app.put('/users/1',(req,res)=> {
  let updateUser = users[0]
  updateUser.name = "Kevin Samuels"
  return res.json(updateUser.name)
});

// DELETE /users/1
app.delete('/users/1', (req, res) => {
  users.splice(0,1)
  res.send('Deleted user')
  return res.json(users)
})

// ***************** PART 2 *************************

app.post('/users/', (req, res) => {

  let newUser = req.body
  
  console.log(newUser)
  clientUser._id = counter + 1
  users.push(newUser)
  return res.json(users)
})

app.get('/users/:userId', (req, res) => {
  let userId = req.params.userId -1
  return res.json(users[userId])
})
// **************** PART 3 *********************

app.put('users/:userId', (req, res) => {
  let userId = req.params.userId -1
  users[userId].name = "Tony Parker"
  return res.json(users[userId])
})

app.delete('/users/:userId', (req, res) => {
  let userId = req.params.userId -1
  users[userId].isActive = false
  res.send("deleted")
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))