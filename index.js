
const express = require('express')
const parse = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
/* BEGIN - create routes here */

//GET method to get all users.
app.get('/users', (req, res) => {
  res.json(users)
})

//GET method to get single user's information.
app.get('/users/:id', (req, res) => {
  //Create a variable to determing if a userID is found.
  const found = users.some(user => user._id === parseInt(req.params.id));
  //Create an if statement to return the user info if the ID is found, and an error if the ID is not found.
  if(found) {
    res.json(users.filter(user => user._id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `User ${req.params.id} not found`})
  }
});
//_________________________________________
//POST Method
app.post('/users', (req, res) => {
    const newUser = {
      _id: req.body._id,
      name: req.body.name,
      occupation: req.body.occupation,
      avatar: req.body.avatar
    }
    users.push(newUser)
    res.json(users)
  //res.send(req.body)
})

//PUT Method - update a user
app.put('/users/:id', (req, res) => {
  const found = users.some(user =>user._id === parseInt(req.params.id))

  if(found) {
    const upUser = req.body
      users.forEach(user => {
        if(user._id === parseInt(req.params.id)){
          user.name = upUser.name ? upUser.name : user.name
          user.occupation = upUser.occupation ? upUser.occupation : user.occupation

          res.json ({msg: `The user ${req.params.id} was updated.`})
        }
      })
  }else{
    res.status(400).json({msg: `No user with the id of ${req.params.id}`})
  }
})

//DELETE Method
app.delete('/users/:id', (req, res) => {
  //Create a variable to determing if a userID is found.
  const found = users.some(user => user._id === parseInt(req.params.id));
  //Create an if statement to return the user info if the ID is found, and an error if the ID is not found.
  if(found) {
    res.json({ msg: `User ${req.params.id} deleted`, users: users.filter(user => user._id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({msg: `User ${req.params.id} not found`})
  }
});
//_________________________________________

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))