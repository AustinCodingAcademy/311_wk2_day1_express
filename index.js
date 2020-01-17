
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
// app.use((req, res, next) => {
//   //authorization logic would go here
app.get('/users',(req, res) => {
  return res.json(users)
})

app.get('/users/1',(req, res)  => {
  return res.json(users[0])
})

app.post('/users', (req, res) => {
  const usersLengthBefore = users.length;
  users.push({
    "_id": usersLengthBefore + 1,
    "name": `Hardcoded - user ${usersLengthBefore + 1}`,
    "occupation": `Hardcoded - user ${usersLengthBefore + 1}`,
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  })
  return res.json(users[users.length -1]);
})

app.put('/users/1', (req, res) => {
  users[0].occupation = "A new occupation!";
  return res.json(users[0]);
})

app.delete('/users/1', (req, res) => {
  users.pop()
  return res.send('deleted');
})


//part 3 # 1
app.get('/users/:_id', (req, res) => {
  return res.json(users.filter(users => users._id === parseInt(req.params._id)));
})

// using variables as id
// app.get("/users/:userId", (req, res) => {
//   let theIdImLookingFor = req.params.userId;
//   console.log(theIdImLookingFor);
// }

app.put('/users/:userId', (req, res) => {
  let userId = req.params.userId;
  let currentUser = users.find(function (user) {
    return user._id == userId;
  })
  currentUser.occupation = "Dog Walker!";
  return res.json(currentUser);
})



/* END - create routes here */

app.listen(4000, () => 
  console.log(`Example app listening on port ${port}!`))