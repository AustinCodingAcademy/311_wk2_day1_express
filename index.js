
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
var bodyParser = require('body-parser')

app.use(bodyParser.json())

const { users } = require('./state')
let counter = users.length;

// console.log(users.length)

/* BEGIN - create routes here */
app.use((req, res, next) => {
  if(req.path === "/users" && req.method === "GET") {
    return res.json(users)
  }
  next()
})

// app.use((req, res, next) => {
//   if(req.path === "/users/1" && req.method === "GET") {
//     let user = users.find(u => u._id  == 1)
//     return res.json(users[0])
//   }
//   next()
// })

// This chunk of code was from Part 1. It's commented out because
// the code made for Part 2 interfered with it.

// app.post('/users', (req, res) => {
//   let user = req.body;
//   users.push(user);
//   //where is the body?
//   res.json({user: user})
// })

// app.put('/users/1', (req, res) => {
//   //where is the body?
//   let partialUserData = req.body;
//   Object.assign(users[0], partialUserData)

//   // This would be a simpler approach at Part 1:
//   // users[0].name = req.body.name
//   // users[0].occupation = req.body.occupation

//   res.json({partialUserData})
// })

app.delete('/users/1', (req, res) => {
  users.splice(0, 1);

  res.send('deleted')
})

app.post('/users', (req, res) => {
  let user = req.body;
  let newUserId = counter + 1;
  counter = counter + 1;

  req.body._id = newUserId;

  users.push(user);

  res.json({user: user})
})

app.get('/users/:userIds', (req, res) => {
  let user = users.find(p=>p._id == req.params.userIds);

  res.json(user)
  // console.log(req.params.userIds);
})

app.put('/users/:userIds', (req, res) => {
  let partialUserData = req.body;

  let user = users.find(p=>p._id == req.params.userIds);

  Object.assign(user, partialUserData)

  res.json({user})
})

app.delete('/users/:userIds', (req, res) => {
  let disableUser = [];
  disableUser["isActive"] = "false";

  let user = users.find(p=>p._id == req.params.userIds);
  Object.assign(user, disableUser)

  res.send('deleted')
})
 /* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))