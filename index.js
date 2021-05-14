
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Variables
let {users} = require('./state')
let counter = users.length
const {functions} = require('./functions.js')

/* BEGIN - create routes here */

//Part I
// app.get('/users', (req, res) => {
//   res.json(users)
// })
//
// app.get(`/users/:id`, (req, res) => {
//   res.json(users[req.params.id - 1])
// })
//
// app.post('/users', (req, res) => {
//   users.push({
//     '_id': req.body._id,
//     'name': req.body.name,
//     'occupation': req.body.occupation
//   })
//
//   res.json(users[users.length -1])
// })
//
// app.put('/users/:_index', (req, res) => {
//   let user = users[req.params._index -1]
//   user.name = "Dominik"
//   users[req.params._index -1] = user;
// })
//
// app.delete('/users/:_index', (req, res) => {
//   // let user = users[req.params._index -1];
//   users.unshift()
//   res.send("Deleted")
// })

//Part II

app.post('/users', (req, res) => {
  counter = counter.toString()
  users.push({
    '_id': "" + ++counter,
    'name': req.body.name,
    'occupation': req.body.occupation
  })
  res.json(users[users.length -1])
})

// Part III
app.get('/users/:id', (req, res) => {
  users.forEach(user => {
    if(user._id == req.params.id) {
      res.json(user)
    }
  })
  //TODO:figure this shit out
  // res.json(functions.getUser(req.params.id))
})

app.put('/users/:id', (req, res) => {
  users.forEach(user => {
    if(user._id == req.params.id) {
      user.name = req.body.name !== undefined ? req.body.name : user.name
      user.occupation = req.body.occupation !== undefined ? req.body.occupation : user.occupation
      res.json(user)
    }
  })
})

app.delete('/users/:id', (req, res) => {
  users.forEach(user => {
    if(user._id == req.params.id) {
      user.isActive = false
      user.isAnthonyAHater = true
      // res.json(user)
      res.send("deleted")
    }
  })
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))