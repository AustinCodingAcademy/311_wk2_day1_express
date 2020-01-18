
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser());

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users',(req, res) => {
  return res.json(users)
 });

 app.get('/users/:userId',(req, res) => {
   const id = req.params.userId
   console.log(id)
   const user = users.find(user => {
     return user._id === id
   })
  return res.json(user)
 });


app.post('/users', (req, res) => {
  const user = req.body
  console.log(user)
  user._id = users.length + 1
  users.push(user)
  console.log(users.length)
  return res.json(user)

});
app.put('/users/:userId', (req, res) => {
  const id = req.params.userId
  const user = users.find(user => {
    return user._id == id
  })
  user.occupation = 'plumber'
  return res.json(user)
})

app.delete('/users/:userId', (req, res) => {
  const id = req.params.userId
  const userIndex = users.findIndex(user => {
    return user._id == id
  })
  users.splice(userIndex)
  return res.send('deleted')
})


/* END - create routes here */

app.listen(4000, () => 
  console.log(`Example app listening on port ${4000}!`))