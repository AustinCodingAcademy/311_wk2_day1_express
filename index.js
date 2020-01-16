const express = require('express')
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

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))