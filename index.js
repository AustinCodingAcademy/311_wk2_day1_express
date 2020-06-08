
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = 1
app.use(bodyParser.json())

/* BEGIN - create routes here */
app.get('/users',(req,res)=>{
  res.json(users)
})

// app.get('/users/1',(req,res)=>{
//   for(let i = 0; i < users.length;i++){
//     if(users[i]._id === 1){
//      return res.json(users[i])
//     }
//   }
// })

app.get('/users/:userId',(req,res)=>{
  let userStringId = req.params.userId
  let userId = parseInt(userStringId)
  console.log(userId)
  for(let i = 0; i < users.length;i++){
    if(users[i]._id === userId){
      return res.json(users[i])
    }
  }
})
// Part 2. Body-parser module
// Require the body-parser module on the line below require('express'). (it has already been npm installed)

// Give your server the ability to handle a POST request with a path "/users" and add the data from the client to the users array

// This means you will be adding req.body. Console log this to see what you get and don't forget to send an actual body with the request in Postman

// Assign an _id property to the user object that is a number that increments by 1 each time.

// To do this, set a variable called counter near the { users } variable. Start it at the length of the users array
// Use res.json() to send the user object back to the client. (if you do another GET request you should see this added)
app.post('/users',(req,res)=>{
  req.body = {
    "_id": 7,
    'name' : "John",
    "occupation":"racer",
    'avatar': "this"
  };
  // let john = {
  //   "_id": 6,
  //   'name' : "John",
  //   "occupation":"racer",
  //   'avatar': "this"
  // }
  users.push(req.body)
  for(let i = 0; i < users.length;i++){
    users[i]._id = counter + users.indexOf(users[i])
  }
  
  return res.json(users)
})

// app.put('/users/1',(req,res)=>{
//   for(let i = 0; i< users.length;i++){
//     if(users[i]._id === 1){
//       users[i].name = "Michael"
//       return res.json(users[i])
//     } 
//   }
// })

app.put('/users/:userId',(req,res)=>{
  let userStringId = req.params.userId
  let userId = parseInt(userStringId)
  console.log(userId)
  for(let i = 0; i< users.length;i++){
    if(users[i]._id === userId){
      users[i].occupation = userStringId
      return res.json(users[i])
    }
  }
})
// app.delete('/users/1',(req,res) => {
//   for(let i = 0; i< users.length;i++){
//     if(users[i]._id === 1){
//       let deleted = users.indexOf(users[i])
//       delete users[deleted]
//       return res.json(users)
//     }
//   }
// })
app.delete('/users/:userID',(req,res)=>{
  let userStringId = req.params.userID
  let userId = parseInt(userStringId)
  for(let i = 0; i< users.length;i++){
        if(users[i]._id === userId){
          let deleted = users.indexOf(users[i])
          delete users[deleted]
          return res.json(users)
        }
      }
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))