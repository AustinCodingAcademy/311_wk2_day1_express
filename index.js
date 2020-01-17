const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
// const path = require('path');
const bodyParser = require('body-parser')

const { users } = require('./state')

let counter = users.length;

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

/* BEGIN - create routes here */
app.use((req, res, next) => {
  //authorization logic would go here
  next()
})

app.use(express.json());

// GET Method
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/users', function(req, res) {
//   res.json(users)
// })

// app.get('/users/1', function(req, res) {
//   res.json(users[0])
// })



// POST Method
app.post('/users', (req, res) => {
  console.log(req.body)
  users.push({
    "_id": counter += 1,
    "name": req.body.name,
    "occupation": req.body.occupation,
    "avatar": req.body.avatar
  })

  // users.push({'_id': 6, 'name': 'Griswald', 'occupation' : 'Blacksmith', 'avatar' : 'https://vignette.wikia.nocookie.net/diablo/images/c/ce/Griswald.gif/revision/latest/top-crop/width/360/height/450?cb=20080818091701'})
  res.json(users[users.length-1])
  // console.log(users)
})

app.get('/users/:userId', (req, res) => {
  let getUserId = req.params.userId;
  let user = users.find(u => u._id === Number(getUserId))
  // console.log(getUserId)
  res.send(user)
  // console.log(user)
  // res.send()
})

// // PUT Method
app.put('/users/:userId', (req, res) => {
  let getUserId = req.params.userId;
  let user = users.find(u => u._id === Number(getUserId));
  user.name = req.body.name;
  console.log(req.body)
  res.send(user)
})

// // DELETE Method
app.delete('/users/:userId', (req, res) => {
  let getUserId = req.params.userId;
  let user = users.find(u => u._id === Number(getUserId));
  user.isActive = 'false';
  res.json('deleted')
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))