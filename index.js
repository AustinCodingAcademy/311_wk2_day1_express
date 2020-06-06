
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/1', (req, res) => {
  res.json(users[0]);
});

app.post('/users', (req, res) => {
  let newUser = {
    "_id": 6,
    "name": "Han Solo",
    "occupation": "Pilot",
    "avatar": "https://www.starwars.com/databank/han-solo"
  }

  users.push(newUser);
  res.json(users[users.length - 1]);
});

app.put('/users/1', (req, res) => {
  users[0].name = 'Cale Dooper';
  users[0].occupation = 'CIA Agent';
  res.json(users[0]);
});

app.delete('/users/1', (req, res) => {
  users.shift();
  res.send('Deleted')
});




app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))