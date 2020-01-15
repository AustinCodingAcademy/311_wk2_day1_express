
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

  app.put('/users/:userId', (request, response) => {
    let id = request.params.userId;
    let user = users.filter(user => user._id === parseInt(id))[0];
    // let body = request.body;
    // for (let property of body) {
    //   user[property] = body[property]
    // }
    console.log(user)
    user.name = 'Pat White'
    user.occupation = 'Full Stack Developer'
    response.json(user);
  })

  app.delete('/users/:userId', (request, response) => {
    const id = request.params.userId;
    const userIndex = users.findIndex(user => user._id === parseInt(id));
    const deletedUser = users.splice(userIndex, 1);
    response.send(deletedUser);
  })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))