
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const { users } = require('./state')

/* BEGIN - create routes here */

app.get('/users/', (req, res) => {
  
  // send the client all the members in the array
  res.send(res.json(users));
})

app.get('/users/:id', (req, res) => {
  // store the id of the user request using the params of the req object coming from the client.
  const userId = req.params.id
  let reqUser={};
  users.forEach (function(user) {
    if (user._id.toString() === userId.toString())
    reqUser = user
  })
  // send the client a message saying 'success'
  res.send(res.json(reqUser))
})

app.post('/users/', (req, res) => {
const newUser = {
  _id : users.length + 1,
  name: req.body.name,
  occupation : req.body.occupation,
  avatar : req.body.avatar
}

if (!newUser.name || !newUser.occupation) {
  return res.status(400).json({msg: 'Please include a name and occupation'});
}

users.push(newUser);
res.json(users);
})

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  users.forEach (function(user) {
    if (user._id.toString() === userId.toString()){

        users.splice(users.indexOf(user),1);
    }
  })

  res.json(users);
})

app.put('/users/:id',(req,res) => {
  const userId = req.params.id
  let name;
  if(req.body.name) name = req.body.name;
  let occupation; 
  if(req.body.occupation) occupation=req.body.occupation;
  let avatar;
  if(req.body.avatar) avatar=req.body.avatar;
  users.forEach(function(user) {
    if(user._id.toString()===userId.toString()) {

        if (name) users[users.indexOf(user)].name = name;
        if (occupation) users[users.indexOf(user)].occupation = occupation;
        if (avatar) users[users.indexOf(user)].avatar = avatar;
    }

    
  })

  res.json(users);

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))