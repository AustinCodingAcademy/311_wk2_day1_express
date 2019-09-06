
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
// * GET /users
//     * Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
//     * Ex. `res.json(users)`
app.use('./users',function(req,res,next){
  var path = url.parse(req.url).pathname;
  if(!req.session.user){
    res.redirect('login?ref='+path);
  }else{
    next();
  }
})

app.get('/users',function(req,res,next){
  return res.json(users);
})
// GET /users/1

app.get('/users/1',function(req,res,next){
  return res.json(users[0]);
})

// * POST /users
//     * Give your server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js. Use `res.json()` to send the last user in the array (should be the new one) back to the client.
//     * If you do another GET request you should see this added
//     * You will need to create the hard coded user mentioned above
app.post('/users/hardCoded',function(req,res){
  var hardCoded ='hard coded'
  users.push('hardCoded')
  return res.json(users('hardcoded'))
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))