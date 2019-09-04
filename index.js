
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

app.get('/users',(req, res) => {
  return res.json(users)
});

app.get('/users/1',(req, res) => {
  return res.json(users[0])
});

app.post('/users',(req, res) => {
  let newPerson = {
    "_id": 6,
    "name": "Luke Bryan",
    "occupation": "Country Artist",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  };
  users.push(newPerson);
  res.json(users[users.length - 1])
})

app.get('/users',(req, res) => {
  return res.json(users)
});

app.put('/users',(req, res) => {
  
})







/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))


// app.post('/users',(req, res) => {
  // POST = adding something
  // adding something = array.push()
  // a hard coded object
// })