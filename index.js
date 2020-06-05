
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')


/* BEGIN - create routes here */
app.get('/users',(req,res)=>{
  res.json(users)
})
app.get('/users/1',(req,res)=>{
  for(let i = 0; i < users.length;i++){
    if(users[i]._id === 1){
     return res.json(users[i])
    }
  }
})

app.post('/users',(req,res)=>{
  let john = {
    "_id": 6,
    'name' : "John",
    "occupation":"racer",
    'avatar': "this"
  }
  users.push(john)
  return res.json(users)
})

app.put('/users/1',(req,res)=>{
  for(let i = 0; i< users.length;i++){
    if(users[i]._id === 1){
      users[i].name = "Michael"
      return res.json(users[i])
    } 
  }
})
app.delete('/users/1',(req,res) => {
  for(let i = 0; i< users.length;i++){
    if(users[i]._id === 2){
      let deleted = users.indexOf(users[i])
      delete users[deleted]
      return res.json(users)
    }
  }
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))