
const express = require('express');
const bodyParser = require('body-parser');
const { users } = require('./state');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

let counter = users.length;

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.send(users);
})

app.get('/users/:id', (req, res) =>{
  const userId = req.params.id;
  res.send(users[userId-1]);
})

app.post('/users',(req, res) =>{
  console.log(req.body);
  // counter = counter + 1;
  let newUser = {
    ...req.body,
    _id: counter+1,
  }
  users.push(newUser);
  console.log(users);
  res.json(users[counter - 1]);
})

app.put('/users/:userid', (req, res)=>{
  // users[0].name = 'Tim';
  const userId = req.params.userid;
  // let updateUser = {
  //   ...users[userId-1],
  console.log(users[userId -1]);
  // }
  // users[userId -1] = {
  //   ...users[userId-1],
  //   ...req.body
  // }
  res.json(users);
})

app.delete('/users/:userid', (req, res)=>{
  let userId = req.params.userid;
  users.splice(userId - 1, 1);
  console.log(users)
  res.json(users);
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))