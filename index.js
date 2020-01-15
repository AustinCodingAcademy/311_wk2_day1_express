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
  // Hmmmm
  request.body = 'heyoo';
  console.log(users)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))