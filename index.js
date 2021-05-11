
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

// PART ONE:

//GET /users
app.get('/users', function (req, res) {
  res.json(users)
});

//GET /users/1
app.get('/users/1', function (req, res){
  res.json(users[0])
});

//POST /users
app.post('/users', function (req, res) {
  users.push({
    '_id': users.length+1,
    'name': 'Indiana Jones',
    'occupation': 'Archaeologist',
    'avatar': "https://upload.wikimedia.org/wikipedia/en/8/8c/Indiana_Jones_and_the_Last_Crusade.png"
  })  
  res.json(users[users.length-1])
})

//PUT /users/1
app.put('/users/1', function (req, res) {
  res.json(users[0].occupation = 'Nurse');
})

//DELETE /users/1
app.delete('/users/1', function (req, res) {
  res.send('user has been deleted')
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))