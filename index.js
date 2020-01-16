
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length;

/* BEGIN - create routes here */
app.use((req, res, next) => {
  //authorization logic would go here
  next()
})
app.use(express.json());

// GET Method
app.get('/users', function(req, res) {
  res.json(users)
})

app.get('/users/1', function(req, res) {
  res.json(users[0])
})



// POST Method
app.post('/users', (req, res) => {
  console.log(req.body)
  // users.push({'_id': 6, 'name': 'Griswald', 'occupation' : 'Blacksmith', 'avatar' : 'https://vignette.wikia.nocookie.net/diablo/images/c/ce/Griswald.gif/revision/latest/top-crop/width/360/height/450?cb=20080818091701'})
  res.json(req.body)
  console.log(users)
})

// // PUT Method
app.put('/users/1', (req, res) => {
  users[0]._id = 42;
  res.json(users[0])
})

// // DELETE Method
app.delete('/users/1', (req, res) => {
  users.shift()
  res.json('deleted')
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))