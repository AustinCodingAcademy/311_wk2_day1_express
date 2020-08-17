
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
app.use(express.json());
let counter = users.length
  function getNewId(){
    return counter = counter + 1
  }getNewId()
app.get('/users',(req, res) => {
  res.json(users)
})
app.get('/users'[0],(req,res) =>{
  res.json(users[0])
})
app.post('/users',(req,res)=> {
  
 const newUser = {
 name:req.body.name,
 id:getNewId(),  
 occupation: req.body.occupation,
 avatar: req.body.avatar
 }
users.push(newUser)
res.send(newUser)
})
app.delete('/users:idi',(req,res) => {
  for(let i = 0; i < users.length; i++){
 let id = users.id
 users[i].isactive = false
 res.json(deleted)
  } 

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))