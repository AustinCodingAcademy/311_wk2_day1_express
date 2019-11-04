
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  res.json(users.filter(users => users._id === parseInt(req.params.id)));
})

// Create a user.
//  Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.post('/users', (req, res) => {
  const newUser = {
    _id: users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }

  if (!newUser.name){
    return res.status(400).json({ msg: 'Please include a name.'});
  }
  users.push(newUser);
  res.json(users);
})

// Update User
app.put('/users/:id', (req, res) => {
  const found = users.some(users => users._id === parseInt(req.params.id));

  if (found) {
    const updUser = req.body;
    users.forEach(user => {
      if(user._id === parseInt(req.params.id)){
        user.name = updUser.name ? updUser.name : users.name;
        user.occupation = updUser.occupation ? updUser.occupation : users.occupation;
        user.avatar = updUser.avatar ? updUser.avatar : users.avatar;

        res.json({msg: 'User updated', user})
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
  }
});

// User DELETE
app.delete('/users/:id', (req, res) => {
  // const found = users.some(user => user._id === parseInt(req.params.id));
  let usr = users.find(user => user._id === parseInt(req.params.id));

  if (usr) {
    usr.isActive = false;
    res.json({
      msg: 'User deleted',
      users: users
    });
  }else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
  }
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))