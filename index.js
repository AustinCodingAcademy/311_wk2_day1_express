
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

let { users } = require('./state')

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  res.json(users)
})
app.get(`/users/:id`, (req, res) => {
  res.json(users[req.params.id - 1])
})

app.post('/users', (req, res) => {
  const user_id = req.body._id;
  const name = req.body.name;
  const occupation = req.body.occupation;

  res.json(users.push({
    '_id': user_id,
    'name': name,
    'occupation': occupation
  }));
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))