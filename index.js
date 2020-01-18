
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json());

const { users } = require('./state')
let counter = users.length;

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
  counter++;
  users.push({
    "_id": counter,
    "name": `Hardcoded - user ${counter}`,
    "occupation": `Hardcoded - user ${counter}`,
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

//part 2 # 1

app.post('/users', (req, res) => {
  counter++;
  const newUser = req.body;
  newUser._id = counter;
  users.push(newUser);
  res.json(newUser);
});


//part 3 # 1
app.get('/users/:_id', (req, res) => {
  return res.json(users.find(users => users._id === parseInt(req.params._id)));
})


app.put('/users/:userId', (req, res) => {
  let userId = req.params.userId;
  let currentUser = users.find(function (user) {
    return user._id == userId;
  })
  currentUser.occupation = "Dog Walker!";
  return res.json(currentUser);
})

app.delete('/users/:userId', (req, res) => {
  let userId = req.params.userId;
  let currentUser = users.find(function (user) {
    return user._id == userId;
  })
  currentUser.isActive = "false";
  res.send("deleted");
})

/* END - create routes here */
app.listen(4000, () => {
  console.log(`Example app listening on port ${port}!`)
})