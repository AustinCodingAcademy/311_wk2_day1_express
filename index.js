
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require("body-parser")
const { users } = require('./state')

const { users } = require('./state')

/* BEGIN - create routes here */

app.use(bodyParser.json())

app.get('/users', (req, res) => {
   return res.json(users)
 });

 app.get('/users/1', (req, res) => {
  return res.json(users[0])
})

app.post("/users", (req, res) => {

})




app.post('/users', (req, res) => {
  let hardCode = { 
  "_id": 2,
  "name": "seanDale Deshazer",
  "occupation": "Couch Potatoe",
  "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
};
users.push(hardCode);
res.json(users[users.length-1])
})

app.get('/users', (req, res) => {
  return res.json(users)
});

app.put('/users/1', (req, res) => {
  users[0].name = 'sean'
  res.json(users[0])
})

app.delete('/users/1', (req, res) => {
  users[0]._id = null;
  res.send('DELETE')
});


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))