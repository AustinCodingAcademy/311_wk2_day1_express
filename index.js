
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

let newUser = {
  id: 6,
  name: 'PeePee',
  occupation: 'Federal Boob Inspector',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTShirBiF989tESHmrZ-89FjsJrlTsMJMjRt864q_nHA0Cd3KDp'
}


app.get('/users', (req, res) => {
  res.json(users)
})


app.get('/users/1', (req, res) => {
  res.json(users[0])

})

app.post('/users', function (req, res) {
  users.push(newUser)
  res.json(users[users.length - 1]);

})

app.get('/users', (req, res) => {
  res.json(users)
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))