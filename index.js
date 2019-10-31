
const express = require('express')
const parcer = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state') //why is the first users in curley brackets?
let counter = users.length+1

const newUser = {
  "_id": 6,
  "name": "Alexander Ovechkin",
  "occupation": "Hockey Best",
  "avatar": "https://nhl.bamcontent.com/images/photos/309257212/1024x576/cut.jpg"
}

/* BEGIN - create routes here */

//this gets all the users
app.get('/users', (req,res) => {
  res.json(users)
})
// 1 // 
app.get('/users/:userId', (req, res) => {
  res.json(users.filter(user => user.id === parseInt(req.params.id)))
});

// 2 // - get
app.get('/users/:userId', (req, res) => {
  userIdent = req.params.userId

  const theUser = users.some(user => user._id === parseInt(userIdent));
  if(theUser) {
  res.json(users.find(user => user._id === parseInt(userIdent)));
  } else {
  res.status(400).json({msg: `User ${userIdent} not found`})
  }
  });


// 3 // - post
app.post('/users', (req,res) => {
const newPerson = {
  _id: counter,
  name: req.body.name,
  occupation: req.body.occupation,
  avatar: req.body.avatar
}
user.push(newPerson)
res.json(users)
counter = counter+1
})

// 4 // - put
app.put('/users/:userId', (req,res) => {
  const foundId = users.some(user => user._id === parseInt(req.params.userId))

  if(foundId) {
    const 
  }
})
// 5 // - delete

app.delete('/users/:userId', (req,res) => {

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))