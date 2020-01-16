const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.get('/users', (request, response) => {
  return response.json(users);
})

app.get('/users/1', (request, response) => {
  return response.json(users[0]);
})

app.post('/users', (request, response) => {
  request = {
    "_id": 6,
    "name": "Tiny Dinky Daffy",
    "occupation": "Baby",
    "avatar": "https://thetinydinkster.jpg"
  }
  users.push(request);
  return response.json(users);
})

app.put('/users/1', (request, response) => {
  request = 'Bart Harley Jarvis';
  users[0].name = request;
  return response.json(users[0]);
})

app.delete('/users/1', (request, response) => {
  request.body = 1;
  users.shift();
  response.send(`User ${request.body} deleted`);
})

app.use(bodyParser.json());

app.post('/users', (request, response) => {
  request.body._id = users.length;
  request.body._id ++;
  users.push(request.body);
  return response.json(users[users.length - 1]);
})

app.get('/users/:userId', (request, response) => {
  let userId = request.params.userId;
  return response.json(users.find(x => x._id === parseInt(userId)));
})

app.put('/users/:userId', (request, response) => {
  let userId = request.params.userId;
  user = users.find(x => x._id === parseInt(userId));
  user.name = 'Bart Harley Jarvis';
  return response.json(user);
})

app.delete('/users/:userId', (request, response) => {
  let userId = request.params.userId;
  user = users.find(x => x._id === parseInt(userId));
  user.isActive = false;
  return response.send(`User ${userId} deleted`);
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))