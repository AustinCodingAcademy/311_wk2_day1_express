
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  return res.json(users);
});

app.get('/users/1', (req, res) => {
  return res.json(users[0]);
});

app.post('/users', (req, res) => {
  return res.send(res.json(users[4]));
});

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))