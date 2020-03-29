
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const { users } = require('./state')

/* BEGIN - create routes here */

// this is your basic GET to return all users
app.get('/users/', (req, res) => {
  
  // send the client all the members in the array
  res.json(users);
})

// this is the GET method to return a single user
app.get('/users/:id', (req, res) => {
  // store the id of the user request using the params of the req object coming from the client.
  const userId = req.params.id
  // create an empty object
  let reqUser={};

  // loop through all the users
  users.forEach (function(user) {
    // if the id in the array is the same as in the request...
    if (user._id.toString() === userId.toString())
    // we've found our guy!
    reqUser = user
  })
  // send the client the user data back to show it worked
  res.json(reqUser)
})

app.post('/users/', (req, res) => {
// create an object for a new user in the users array
const newUser = {
  _id : users.length + 1,
  name: req.body.name,
  occupation : req.body.occupation,
  avatar : req.body.avatar
}

// check to make sure they sent a username and occupation with the request
if (!newUser.name || !newUser.occupation) {
  // if they didn't, respond with an error
  return res.status(400).json({msg: 'Please include a name and occupation'});
}

// add the new user to the array
users.push(newUser);

// return the entire array
res.json(users);
})

// here's the method to delete a user by their id number
app.delete('/users/:id', (req, res) => {
  // get the id of the record to delete
  const userId = req.params.id
  // loop through the array
  users.forEach (function(user) {
    // if you find the id
    if (user._id.toString() === userId.toString()){
        // cut out that record
        users.splice(users.indexOf(user),1);
    }
  })

  // send the modified array back as a response
  res.json(users);
})

// this is the method to change a user's info
app.put('/users/:id',(req,res) => {
  // store the requested id
  const userId = req.params.id
  // now we want to see what parameters we sent
  // so we know which one(s) to change
  let name;
  if(req.body.name) name = req.body.name;
  let occupation; 
  if(req.body.occupation) occupation=req.body.occupation;
  let avatar;
  if(req.body.avatar) avatar=req.body.avatar;

  // loop through the users array
  users.forEach(function(user) {
    // find the record
    if(user._id.toString()===userId.toString()) {
        // make the changes
        if (name) users[users.indexOf(user)].name = name;
        if (occupation) users[users.indexOf(user)].occupation = occupation;
        if (avatar) users[users.indexOf(user)].avatar = avatar;
    }
  })

  // send the modified users array back as a response
  res.json(users);

})
/* END - create routes here */

// start the server!
app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))