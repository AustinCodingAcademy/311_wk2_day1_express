
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

// * GET /users

app.use('/users',(req, res, next) => {
  if(req.path === "/users" && req.method === "GET"){
   return res.json(users)
 }
 next();
});

 
// GET /users/1

  app.get('/users/1',function(req,res,next){
    // if(req.params.id === 1){
    //   return name
    // }else{
    //   next()
    // }
    if(req.path === "/users/1" && req.method === "GET"){
      return res.json(users/1)
    }
    next();
  })


  app.post('/users',function(req,res){
    //if(req.path === "/users" && req.method === "post"){
      res.json(users.push(users[users.length - 1])) 
 // }else{
 //   next()
 // }
    })


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))