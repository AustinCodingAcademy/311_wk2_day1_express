const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require("body-parser")
const { users } = require("./state")
let counter = users.length

/* BEGIN - create routes here */

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.get("/users", (req, res) => {
//   res.json(users)
// })

// app.get("/users/1", (req, res) => {
//   res.json(users[1])
// })

// app.post("/users", (req, res) => {
//   users.push({
//     _id: 6,
//     name: "Scott Tenefrancia",
//     occupation: "Cool Guy",
//     avatar: "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
//   })
//   res.json(users)
// })

// app.put("/users/1", (req, res) => {
//   users[1].occupation = "edited"
//   res.json(users[1])
// })

// app.delete("/users/1", (req, res) => {
//   users.shift()
//   res.send("deleted")
// })

// PT 2

app.post("/users", (req, res) => {
  counter = counter.toString()
  users.push({
    _id: ++counter,
    name: req.body.name,
    occupation: req.body.occupation
  })
  res.json(users[users.length - 1])
})

// PT 3

app.get("/users/:id", (req, res) => {
  users.forEach(user => {
    if (user._id == req.params.id) {
      res.json(user)
    } else {
      res.json("user not found")
    }
  })
})

app.put("/users/:id", (req, res) => {
  users.forEach(user => {
    if (user._id == req.params.id) {
      if (req.body.name != undefined) {
        user.name == req.body.name
      }
      if (req.body.occupation != undefined) {
        user.occupation == req.body.occupation
      }
      res.json(user)
    }
  })
})

app.delete("/users/:id", (req, res) => {
  users.forEach(user => {
    if (user._id == req.params.id) {
      user.isActive = false
      res.send("deleted")
    }
  })
})

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
