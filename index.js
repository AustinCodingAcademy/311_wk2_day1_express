
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

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
    _id: req.body._id,
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

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))