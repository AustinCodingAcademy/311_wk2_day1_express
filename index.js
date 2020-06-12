
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
//const uuid = require('uuid');
const port = process.env.PORT || 4000
 const { users } = require('./state')
//const counter = users.length
 //Body Parser Middleware

 app.use(express.json());
 app.use(express.urlencoded({extended: false}));

 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:userid', (req, res) => { 
  const found = users.some(user => user._id == req.params.userid);
  if(found){
  res.send(users.filter(user => user._id == req.params.userid))
  } else{
    res.status(404).json({ msg: 'User not found'});
    //OR res.status(400).json({ msg: `No user with id of ${req.members.id}` })
  }
})

app.post('/users', (req, res) => { 
  counter = users.length;
  const newUser = {
      _id: counter+1, 
      name: req.body.name,
      occupation: req.body.occupation,
      avatar: req.body.avatar,
  }

  if(!newUser.name || !newUser.occupation){
    return res.status(400).json({ msg: 'Please include a name and occupation'});
  }

  users.push(newUser);
  res.json(users) //returns entire array including newly created object  
  //res.send(post.body)
  //res.json(users)
}); 

//Incorrect code below...
//??HELP??//
app.put('/users/:userid', (req, res) => {
  const updateUser = req.body;
  users.forEach(user => {
    if(user._id === parseInt(req.params.userid)) {
      if(user.name != updateUser.name) {
        user.name = updateUser.name
      }else{
       return user.name 
      }
    }
  })
  res.json(users)
})

app.delete('/users/:userid' , (req, res) => {
  const found = users.some(user => user._id == req.params.userid);
  if(found){
    res.json(
      { 
        message: 'Deleted',
        users: users.filter(user => user._id !== parseInt(req.params.userid))
      })
  }else{
    res.status(404).json({ msg: 'User not found'});
  }
})

/*app.post('/users' , (req, res) => {
  const user = {
    _id: req.body._id,//id
    //Assign an _id property to the user object that is a number that increments by 1 each time.
   //_id: counter++, //counter variable is assigned at top of file...
    name: req.body.name,//name
    occupation: req.body.occupation,//occupation
    avatar: req.body.avatar//avatar
  };
    res.status(201).json({
      message: 'Handling post requests to /users',
      createdUser: user,
      userLength: users.length
    }); 
});*/


/* END - create routes here */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})