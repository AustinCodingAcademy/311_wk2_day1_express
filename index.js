
const express = require('express')
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

// app.post('/users', (req, res) => {
//   const usersLengthBefore = users.length;
//   users.push({
//     "_id": usersLengthBefore + 1,
//     "name": `Hardcoded - user ${usersLengthBefore + 1}`,
//     "occupation": `Hardcoded - user ${usersLengthBefore + 1}`,
//     "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
//   })
//   return res.json(users[users.length -1]);
// })

app.post('/users', (req, res) => {
  users.push({
    "_id": 6,
    "name": "Sarina Colosimo",
    "occupation": "Ads Reviewer",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  })
  return res.json(users[5]);
})

app.put('/users/1', (req, res) => {
  users[0].occupation = "A new occupation!";
  return res.json(users[0]);
})



/* END - create routes here */

app.listen(4000, () => 
  console.log(`Example app listening on port ${port}!`))