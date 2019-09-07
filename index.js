const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
var counter = users.length

app.use(bodyParser.json())

app.get('/users', (req, res) => {
  res.json(users)
  console.log(`number of users: ${counter}`)
})
app.get('/users/:userId', (req, res) => {
  let id = users.filter(x => x._id == req.params.userId);
  res.json(id[0]);
})
app.post('/users', (req, res) => {
  let hardCoded = {
    "_id": counter + 1,
    "name": "Danny Boy",
    "occupation": "NSA Agent",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  }
  users.push(hardCoded)
  res.json(hardCoded)
  console.log(req.body)
})
app.put('/users/:userId', (req, res) => {
  let id = users.filter(x => x._id == req.params.userId);
  id[0].name = 'Britney Spears';
  res.json(id[0]);
})
app.delete('/users/:userId', (req, res) => {
  let id = users.filter(x => x._id == req.params.userId);
  let name = id[0].name;
  id[0].isActive = false;
  res.send(`Deleted User ${name}`);
})


/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`));