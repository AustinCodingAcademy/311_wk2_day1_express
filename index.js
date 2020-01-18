// require express
const express = require('express');
const bodyParser = require('body-parser');
// const moment = require('moment');
const app = express();
// das port
const port = process.env.PORT || 4000;

// connect to state.js, user array
const { users } = require('./state');

// counter for id creation
const counter = function() {
  let id = users.length;
  id++;
  return id;
}

// middleware - response to jsn and nodemon
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* BEGIN - create routes here */
app.use('/users', function (req, res, next) {
  console.log('Oops I Did It Again');
  // console.log(
  //   `${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`
  // );
  next()
})

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id(\\d+)', function(req, res) {
  // res.json(users.filter(user => user._id === parseInt(req.params.id)));
  let usrID = parseInt(req.params.id);
  let user = users.find(arrObj => arrObj._id === usrID);

  console.log(users);
  res.json(user);
         
})

app.post('/users', function(req, res) {
  // let newUser = req.body;
  const newUser = {
    _id: counter(),
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
    status: 'active'
  }
  
  users.push(newUser);
  console.log(newUser);
  res.json(users);
  
})

app.put('/users/:id', function(req, res) {
  let usrID = parseInt(req.params.id);
  let user = users.find(arrObj => arrObj._id === usrID);
  user.occupation = req.body.occupation;

  console.log(user);
  res.json(user);
})

app.delete('/users/:id', function(req, res) {
  let usrID = parseInt(req.params.id);
  let user = users.find(arrObj => arrObj._id === usrID);
  user.isActive = 'false';

  res.json({msg: 'User Deleted', users: users.filter(user => user._id !== parseInt(req.params.id))});


  res.send('User Deleted');
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))