const express = require('express')
const parser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

// All Users
app.get('/users', (req, res) => res.json(users));

// Users based on ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json(users[userId - 1]);
});

// Returns New Posted User
// app.post('/users', (req, res) => {
//   let happy = {
//     "_id": 6,
//     "name": 'Happy Gilmore',
//     "occupation": 'Hockey Player',
//     "avatar": 'https://www.imdb.com/title/tt0116483/mediaviewer/rm692033536' 
//   };
//   users.push(happy);
//   res.json(happy);
// });


app.post('/users', (req, res) => {
  newUser = req.body;
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  users[0].occupation = "potter"
  res.json(users[0]);
});

app.delete('/users/:id', (req, res) => {
  users.splice(0, 1);
  res.send('Deleted First User')
})




/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))