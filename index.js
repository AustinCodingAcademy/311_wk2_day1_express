
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
app.use(bodyParser.json());

/* BEGIN - create routes here */

app.get('/users', (req, res) => res.json(users));

// Get specific user
app.get('/users/:_id', (req, res) => {
  res.json(users.filter(user => user._id === parseInt(req.params._id)));
});

// Add new user
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


// Modifying user
app.put('/users', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params._id));

  if (found) {
    const updUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.occupation = updUser.occupation ? updUser.occupation : user.occupation;
      }
    });
  } else {
    res.json({ msg: 'User not updated', user });
  }
});

// Delete user
app.delete('/users/:_id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params._id));

  if (found) {
    res.json({
      msg: 'User deleted',
      users: users.filter(user => user._id !== parseInt(req.params._id))
    });
  } else {
    res.status(400).json({ msg: 'User not found'})
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))