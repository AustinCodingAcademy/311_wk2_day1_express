
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const counter = users.length
app.use(bodyParser.json())

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/* BEGIN - create routes here */

//Gets all members
app.get('/users', (req, res) => {
  res.json(users);
})

//Gets Single member
//GET /users/1 => GET /users/:userId

app.get('/users/:userId', (req, res) => {
  console.log(req.params.userId)
  const found = users.filter(person => person._id == req.params.userId);

    res.json(found[0]);
  }
)

//Creates new member
app.post('/users', (req, res) => {
  let newUser = {
      "_id": counter + 1,
      "name": "Tomson",
      "occupation" : "Dev",
      "avatar": "https://lgbtqnation-assets.imgix.net/2019/08/emoji-what.jpg?w=790&h=530&fit=crop&auto=format&auto=compress&crop=faces",
    }
  users.push(newUser)
  res.json(newUser)
  console.log(req.body)
})

//Ability to respond to a PUT request with a path "/users/1" and change any key value 
//(ex. name, occupation) on the first user object in the users array in state.js.
//PUT /users/1 => PUT /users/:userId

app.put('/users/:userId', (req, res) => {
  console.log(req.params.userId)
  const found = users.filter(person => person._id == req.params.userId);
  found[0].occupation = "Doctor"
  res.json(id[0])
  }
)

//ability to respond to a DELETE request with a path "/users/1" and remove the first 
//item from the users array. Use res.send() to send back a messsage, "deleted"
//DELETE /users/1 => DELETE /users/:userId

app.delete('/users/:userId', (req, res) => {
  const found = users.filter(person => person.id == req.params.userID);
  let names = found[0].name
  found[0].isActive = false
  res.send(`Deleted: ${names}`)
  } 
)


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))