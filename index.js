
const express = require('express')
var bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 4001
app.use(bodyParser.json())

const { users } = require('./state')
let counter = users.length;

let newUser = {
  
    "_id": counter + 1,
    "name": "Kobe Bryant",
    "occupation": "NBA player",
    "avatar": "https://upload.wikimedia.org/wikipedia/commons/9/96/Kobe_Bryant_8.jpg"
}

app.use(bodyParser.json());
/* BEGIN - create routes here */
app.get('/users',(req,res)=> {
  res.json(users);
})
app.get('/users/:id',(req,res)=> {
  let getUser = users.find(getUser => getUser._id === parseInt(req.params.id))
  res.json(getUser);
})

app.post('/users',(req,res)=>{
  req.body
  users.push(newUser);
  res.json(users[users.length -1]);
  counter++
})



app.put('/users/:id',(req,res)=> {
  let getUser = users.find(getUser => getUser._id === parseInt(req.params.id))
  req.body
  res.json(getUser);
})


app.delete('/users/:id',(res,req) => {
  let getUser = users.find(getUser => getUser._id === parseInt(req.params.id))
  getUser.isActive = false;
  res.json('deleted!')
})




/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))