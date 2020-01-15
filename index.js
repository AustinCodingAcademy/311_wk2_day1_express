
const express = require('express')
const app = express()
// const bodyParser = require('body-parser');

const port = process.env.PORT || 4000

const { users } = require('./state');
let idCounter = users.length;

app.use(express.json());
app.use(express.urlencoded({extend: false}));
/* BEGIN - create routes here */


app.get('/users', (request, response)=>{
  response.json(users)
})

app.get('/users/:id', (request, response)=> {
  const id = request.params.id;
  const requestedUser = users.filter(user => user._id === parseInt(id))
  console.log(id);
  response.send(requestedUser);
})


  app.post('/users', (request, response)=> {
    // users.push(newUser)
    // response.send(newUser);

    console.log(request.body);
    // response.send(request.body);
    // console.log(request.body);
    const newUser = request.body;
    idCounter++
    newUser._id = idCounter;
    users.push(newUser);
    response.json(newUser);
  })

  app.put('/users/1', (request, response) => {
    let user = users[0];
    user.name = 'Pat White'
    user.occupation = 'Full Stack Developer'
    response.json(user);
  })

  app.delete('/users/1', (request, response) => {
    users.shift();
    response.send('deleted');
  })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))