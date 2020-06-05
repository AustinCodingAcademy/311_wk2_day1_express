
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// const body = 

const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(bodyParser.json());
/* BEGIN - create routes here */
app.get('/users', (req,res)=>{
  res.json(users)
  // res.send("Hello World")
});
app.get('/users/:id', (req, res)=>{
  for(let i = 0; i < users.length; i++){
    if(users[i]._id === parseInt(req.params.id)){
      res.json(users[i])
    }
  }
});
app.post('/users', (req, res)=>{
  const newUser = {
    "_id": 6,
    "name": "Homer Simpson",
    "occupation": "Safety Inspector",
    "avatar": "https://pyxis.nymag.com/v1/imgs/f22/cee/18a5c624814d1fee69692841d2f92e89ad-21-homer-bushes-lede.rhorizontal.w700.jpg"
  }
  users.push(newUser)
  for(let i = 0; i < users.length; i++){
    if(users[i]._id === 6){
      res.json(users[i])
    }
  }
})
app.put('/users/:id', (req,res)=>{
  for(let i = 0; i < users.length; i++){
    if(users[i]._id === parseInt(req.params.id)){
      users[i].name = "John Doe"
      res.json(users[i])
    }
  }
})
app.delete('/users/:id', (req,res)=>{
  for(let i = 0; i < users.length; i++){
  if(users[i]._id === parseInt(req.params.id)){
    users[i].isActive = "False"
    res.send("deleted")
  }
}
  // users.shift();
  // res.json(users)
  // res.send("deleted")
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))