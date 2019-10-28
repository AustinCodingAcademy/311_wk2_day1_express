
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

//GET method get all users

app.get('/users', (req, res) => {
  res.json(users)
})

//Get method get single user
app.get('/users/:id', (req, res) => {
   res.json(users.filter(user => user._id === parseInt(req.params.id)));
   
});

//POST Method
app.post('/users', (req, res) => {
    res.json({_id: 6, name: "Bob Evans", occupation: "waiter", avatar: "Avatar"})
})

//DELETE Method
app.delete('/users/1')

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))