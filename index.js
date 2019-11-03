
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
app.put('/users/:userId', (req, res) => {
  const them = users.some(user =>user._id === parseInt(req.params.userId))
  
  if(them) {
  const findUser = req.body
  users.forEach(user => {
  if(user._id === parseInt(req.params.userId)){
  user._id = findUser._id ? findUser_id : user._id
  user.name = findUser.name ? findUser.name : user.name
  user.occupation = findUser.occupation ? findUser.occupation : user.occupation
  user.avatar = findUser.avatar ? findUser.avatar : user.avatar
  res.json (`${req.params.userId} was updated.`)
  }
  })
  }else{
  res.status(400).json(`${req.params.userId} is not a user`)}
  })
  
// 5 // - delete

app.delete('/users/:userId', (req, res) => {

  const found = users.some(user => user._id === parseInt(req.params.userId));
  userIndex = parseInt(req.params.userId);
  deletedUserIndex = userIndex -1;
  

  if(found) {
  users[deletedUserIndex]["isActive"] = "false"
  res.send(`${userIndex} was successfully deleted`)
  
  } else {
  res.status(400).json(`${req.params.userId} not found`)
  }
  
  console.log(deletedUserIndex)
  console.log(userIndex)
  console.log(users)
  });
  
  / END - create routes here /

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))