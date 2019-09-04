
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(bodyParser.json())

app.get('/users', (req, res) => {
  res.json(users)
})
app.get('/users/1', (req, res) => {
  res.json(users[0])
})
app.post('/users', (req, res) => {
  let hardCoded = {
    "_id": 6,
    "name": "Danny Boy",
    "occupation": "NSA Agent",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  }
  //res.json(users[users.length - 1])
  res.send(hardCoded)
  console.log(req.body)
  users.push(hardCoded)
})
app.put('/users/1', (req, res) => {
  users[0].name = 'Brittney Spears'
  res.json(users[0])
})
app.delete('/users/1', (req, res) => {
  users.shift()
  res.send('Deleted User 1')
})


/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`));