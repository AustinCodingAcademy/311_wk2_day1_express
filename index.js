
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')

const { users } = require('./state')

/* BEGIN - create routes here */

// Enable body parser for application/json
app.use(bodyParser.json())

// Route to get all users
app.get('/users', (req, res) => {
  res.json(users)
})

// Route to get single user
app.get('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  res.json(user)
})

// Route to make a post
app.post('/users', (req, res) => {
  const newUser = {
    _id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser)
  res.json(users)
})


// Update user
app.put('/users/:id', (req, res) => {
  
  const found = users.some(user => user._id === parseInt(req.params.id));
  
  if (found) {
    const updateUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;

        res.json({ msg: "User updated successfully", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No User with id of ${req.params.id}` });
  }
})


// Delete user
app.delete('/users/:id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found){
    let user = users.find(user => user._id === parseInt(req.params.id))
    console.log(user)
    user.isActive = false;
    res.json({
      Message: 'User Deleted',
      user
    })
  }
})




/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))