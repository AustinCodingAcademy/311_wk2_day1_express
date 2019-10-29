

const express = require('express')
const app = express()

const badyParser = require("body-parser")

const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(badyParser.json())



app.get("/users", (req, res) => {
  res.json(users)
})

app.get("/users/:userId", (req, res) => {
  console.log(req.params)

  res.json(users[req.params.userId -1])
})

let newUser = {
  "name":"Chad"
}

app.post("/users", (req, res) => {
  users.push(req.body)
  console.log(req.body)
  users[users.length-1].id = users.length
  res.json(users[users.length -1])
})



app.put("/users/:userId", (req, res) => {
  users[req.params.userId -1].name = "Stacey"
  res.json(users[req.params.userId -1])
})

app.delete("/users/:userId", (req, res) => {
  // users.shift()
  users[req.params.userId -1].isActive = false
  res.send("Deleted")
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
