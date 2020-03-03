
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.send(users);
})

app.get('/users/:id', (req, res) =>{
  const userId = req.params.id;
  res.send(users[userId-1]);
})

app.post('/users',(req, res) =>{
  const newUser = {
    '_id': 6,
    'name': 'Rick Sanchez',
    'occupation': 'Chemist',
    'avatar': "https://www.fillmurray.com/200/300"
  }
  users.push(newUser);
  res.json(users[users.length - 1]);
})

app.put('/users/1', (req, res)=>{
  // users[0].name = 'Tim';
  let updateUser = {
    ...users[0],
    name: 'Jimothy'
  }
  res.json(updateUser);
})

app.delete('/users/1', (req, res)=>{
  let updateUsers = users.shift();
  console.log(updateUsers)
  res.json('deleted');
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))