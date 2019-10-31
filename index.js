
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length;

app.use(bodyParser.json());

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users);
  console.log(`Number of users: ${counter}`)
})

/* Gets user with ids */
app.get('/users/:id', (req, res) => {
  let id = users.filter(x => x._id == req.params.id);
  res.json(id[0])
})

/* Sends a post request with user data */
/* Increments the number of users */
app.post('/users', (req, res) => {
   users.push({
    // "_id": counter + 1,
    // "name": "John Smith",
    // "occupation": "Laborer",
    // "avatar": "https://www.sideshow.com/wp/wp-content/uploads/2017/10/a-nightmare-on-elm-street-freddy-krueger-premium-format-feature-300366-740x448.jpg"
    "_id": counter+1,
    "name": req.body.name,
    "occupation": req.body.occupation,
    "avatar": req.body.avatar
  })
  counter++;
})

/* Sends a put request and changes an objects name */
app.put('/users/:id', (req, res) => {
  let id = users.filter(n => n._id == req.params.id);
  id[0].name = "Casey Calkins";
  res.json(id[0])
})

// Deletes a user and responds back that the user has been deleted. Also decrements the number of users in the object.
app.delete('/users/:id', (req, res) => {
  let id = users.filter(x => x._id == req.params.id);
  let deletedUser = id[0].name;
  id[0].isActive = false;
  res.send(`${deletedUser} has been deleted from the database.`)
  counter--;
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))