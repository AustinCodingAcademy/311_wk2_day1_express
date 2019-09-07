
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require("body-parser")

const { users } = require('./state')
let Counter = users.length;


/* BEGIN - create routes here */
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.json(users);
})

app.post('/users', (req,res) => {
  Counter = 1 + Counter
  let hardCoded =  {
    "_id": Counter,
  "name": "Dan the Man",
  "occupation": "Loser",
  "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
}
    users.push(hardCoded);
    res.json(hardCoded);
    console.log(req.body)
})


app.get('/users',(req,res) => {
  res.json(users);
})

app.put('/users/:userId', (req,res) => {
  let InfoChange = users.filter(each => each._id == req.params.userId) 
  InfoChange[0].name = "Ozzy Osbourne"
  res.json(InfoChange);
})

app.delete('/users/:userId', (req,res) => {
  let UserDel = users.filter(each =>
    each._id == req.params.userId)
    UserDel[0].isActive = false
    res.send("deleted")
  console.log(users)
})

app.get('/users/:userId', (req,res) => {
   let id = users.filter(each => each._id == req.params.userId)
    let userObj= id[0]
   console.log(id)
   res.json(userObj)
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))