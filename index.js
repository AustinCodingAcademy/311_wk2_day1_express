
const express = require('express')
const app = express()
// using tbhe variable app to invoke express
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const { users } = require('./state')
let counter = users.length+1
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// * BEGIN - create routes here */
// This displays the USERS
app.get('/users', (req, res) => {
  res.json(users)
})
// This gets the USER BUT!! inquires the 1st USER calling INDEX 0 which is user w/ ID 1
app.get('/users/1', (req, res) => {
  res.json(users[0])
})

app.post('/users', (req, res) => {
  // const newUser = {_id: 6, name: "Bobby Shenanigan", occupation: "Poppin Poops", avatar: "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"}
  users.push({_id:counter++, ...req.body})
  console.log(req.body)
  res.json(users[users.length-1])
 
})

app.put('/users/:userId' , (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.paramsuserId)))
  let user = foundUser[0]
  user.name = req.body.name ? req.body.name : user.name
  user.avatar = req.body.avatar ? req.body.avatar :
  user.avatar
    user.occupation = req.body.occupation ? req.body.occupation
    : useroccupation
    res.json(user)
    })

app.delete('/users/:userId', (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.params.userId)))
  let user = foundUser[0]
  if (user) {
    user.isActive = false
    res.send("The deed is done")
  } else {
      res.status(400).json({ message: `No member with the id of ${req.params.userId}`})
    }
})


app.get('/user/:userId', (req, res) => {
  res.json(users[req.params.userId-1])
});

/* END - create routes here */

// listen is a method on express
app.listen(port, () => 
  console.log(`My app is listening ${port} at ${new Date}!`));