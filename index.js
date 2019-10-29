
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

let newUser = {
  "_id": 6,
  "name": "Sterling Archer",
  "occupation": "Agent",
  // "avatar": "./scott.png"
}

/* BEGIN - create routes here */
app.get('/users',(req,res) => {
res.json(users);
})

app.get('/users/1', (req, res) => {
  res.json(users[0]);
})

app.post ('/users', (req, res) => {
  users.push(newUser)
  res.json(users[users.length - 1]);

})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))