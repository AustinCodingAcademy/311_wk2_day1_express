
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(bodyParser.json());

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users);
})

/* Gets user with ids */
app.get('/users/:id', (req, res) => {
  let id = users.filter(x => x._id == req.params.id);
  res.json(id[0])
})

/* Sends a post request with user data */
app.post('/users', (req, res) => {
  users.push({
    "_id": 6,
    "name": "John Smith",
    "occupation": "Laborer",
    "avatar": "https://www.sideshow.com/wp/wp-content/uploads/2017/10/a-nightmare-on-elm-street-freddy-krueger-premium-format-feature-300366-740x448.jpg"
  })
})

app.put('/users/1', (req, res) => {
  users.push({
    "name": "Testing names"
  })
})

// Gets users

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))