const express = require('express')
const router = express.Router()

const { users } = require('../state')


// Route to get all users
router.get('/users', (req, res) => {
  res.json(users)
})

// Route to get single user
router.get('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  res.json(user)
})

// Route to make a post
router.post('/users', (req, res) => {
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
router.put('/users/:id', (req, res) => {
  
  const found = users.some(user => user._id === parseInt(req.params.id));
  
  if (found) {
    const updateUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;
        user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;

        res.json({ msg: "User updated successfully", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No User with id of ${req.params.id}` });
  }
})


// Delete user
router.delete('/users/:id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found){
    let user = users.find(user => user._id === parseInt(req.params.id))
    user.isActive = false;
    res.json({
      Message: 'User Deleted',
      user
    })
  }
})

module.exports = router;