
const express = require('express')
const BPars = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
app.use(express.json())

app.get('/users', (req, res) => {
  res.json(users)
})

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users[req.params.userId - 1])
})

// app.get('/users/1', (req, res) => {
//   res.json(users[0])
// });

app.post('/users', (req, res) => {
  req.body._id = user.length +1
  users.push(req.body)
  res.send(users)
})



app.put('/users/:userId', (req, res) => {
  // users[0].delete;
  // res.send('deleted')
  req.body._id = users[req.params.userId -1]._id
  users[req.params.userId - 1] = req.body
  res.send(users)
})

app.delete(`/users/:userId`, (req, res) => {
  users[req.params.userId].isActive = false
  res.send('deleted')
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))