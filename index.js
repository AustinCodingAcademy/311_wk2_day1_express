
const express = require('express')
const bodyParser = require('body-parser')

const app = express()


const port = process.env.PORT || 4000

const { users } = require('./state')
let usersCounter = users.length
app.use(express.json());

/* BEGIN - create routes here */
 app.get('/users', (req, res) => {
  res.json(users)
  
 });
 app.get('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  res.json(user)
  console.log(req.params,user)
  
 });
 app.post('/users', (req, res) => {
   console.log(req.body)
   users.push(
     {
    "_id":usersCounter += 1 ,
        "name": req.body.name,
        "occupation": req.body.occupation,
        "avatar": req.body.avatar,}

   )
  res.json(users)

  
 });
 app.put('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  user.name = 'new player'
  res.json(user)
  
 });
 app.delete('/users/:id', (req, res) => {
  let user = users.find(user => user._id === parseInt(req.params.id))
  user.isActive = false

  res.json('deleted')

  
 });



/* END - create routes here */

app.listen(port, () =>  console.log(`Server started on port ${port}`));