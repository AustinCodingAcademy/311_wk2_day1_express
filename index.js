
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length;

app.use(bodyParser.json());

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  return res.json(users)
});

app.get('/users/:id', (req, res) => {
  let userId = parseInt(req.params.id);
  let aUser = users.find(user => user._id === userId);
  return res.json(aUser);
});

//add new user
app.post('/users', (req, res) => {
  const newUser = {
    _id: ++counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
}; 

  users.push(newUser);
  res.json(users);

});

//update user
app.put('/users/:id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users.forEach(user => {
      if(user._id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;
        user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;

        res.json({ msg: 'User updated', user});
      }
    });
  } else {
    res.status(400).json({ msg: `No user with id: ${req.params.id}`});
  }
});

//delete user
app.delete('/users/:id', (req, res) => {
  let userId = parseInt(req.params.id);
  let aUser = users.find(user => user._id === userId);
  aUser.isActive = false;
  res.send('deleted')
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))