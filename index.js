
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
let { users } = require('./state')
let counter = users.length+1

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/* BEGIN - create routes here */
// app.get('/users', (req, res) => {
//   res.json(users)
//   res.send(req.params)
// })

app.get('/users/:userId', (req, res) => {
  let id = parseInt(req.params.userId)
  for (let i = 0; i < users.length; i++){
    if (users[i]._id === id) {
      res.json(users[i])
    }
  }
})

app.post('/users', (req, res) => {
//  const user5 = {_id: 5, name: "Jason Vorhees", occupation: "Carving Enthusiast", avatar: "https://vignette.wikia.nocookie.net/fridaythe13th/images/e/e5/Freddy_vs_Jason_%282%29.jpg/revision/latest?cb=20171001043508" }
 
 users.push({_id: counter++, ...req.body})
 console.log(req.body)
 res.json(users[users.length-1])
})

app.put('/users/:usersId', (req, res) => {
  let foundUser = (users.filer( user => user._id === parseInt(req.params.userId))
)
let user = foundUser[0]
user[0].name = req.body.name ? req.body.name : user.name
user[0].occupation = req.body.occupation ? req.body.occupation : user.occupation
user[0].avatar = req.body.avatar ? req.body.avatar : user.avatar
res.json(user)

})

app.delete('users5', (req, res) =>{
   let foundUser = (users.filer( user => user._id === parseInt(req.params.userId))
)
 let user = foundUser[0]
 if (user) {
   user.isActive = false
   res.send("Deleted")
 } else {
      res.status(400).json({ message: `No member with the id of ${req.params.userId}`})
    }

  
})


/* END - create routes here */



app.listen(port, () => 
  console.log(`My app is listening on port ${port} at ${new Date}!`))