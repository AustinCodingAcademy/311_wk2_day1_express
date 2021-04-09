//requirements 
const express = require('express'); // import express
const uuid = require('uuid'); //import uuid 
const app = express(); //instantiate express 
const port = process.env.PORT || 4000; 
const { users } = require('./state');
let counter = users.length + 1;  

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// GET Routes
app.get('/users', function(req, res) { 
  res.json(users); 
}); 

app.get('/users/:userId', function (req, res){

  let id = req.params.userId; 

  for(let i = 0; i < users.length; i++){
    let currentUser = users[i]; 
    let currentUserId = users[i]._id;
    if(currentUserId == id){
      res.json(currentUser); 
    }
  }
  res.status(400).json({ msg: 'No member with the id of ' + id}); 
})

// POST route (create)
app.post('/users', function(req, res){

  const newUser = {
    _id: counter, 
    // or uuid.v4(); 
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };

  users.push(newUser);
  counter++;  
  res.json(users[users.length - 1])
  
})

// PUT Route (update)

app.put('/users/:userId', function(req, res){
  const id = req.params.userId; 
  
  for(let i = 0; i < users.length; i++){
    let currentUser = users[i]; 
    let currentUserId = users[i]._id;
    if(currentUserId == id){
      const foundMember = currentUser; 
      foundMember.occupation = req.body.occupation;
      foundMember.name = req.body.name; 
      res.json({ msg: 'member found and updated', foundMember })
    }
  }
  res.status(400).json({ msg: 'No member with the id of ' + id}); 
})

// DELETE Route

app.delete('/users/:userId', function(req, res){
  const id = req.params.userId; 

  for(let i = 0; i < users.length; i++){ 
    let currentUserId = users[i]._id; 
    if(currentUserId == id){ 
      let foundUser = users.splice(i,1);
      foundUser[0].isActive = false; 
      res.json({ msg: 'member found and deleted', foundUser, users })
    }
  }
  res.status(400).json({ msg: 'No member with the id of ' + id}); 
})


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))