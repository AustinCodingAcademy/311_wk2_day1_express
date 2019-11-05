
const express = require('express')
const app = express()
var bodyparser = require('body-parser')
app.use(bodyparser.json());
const port = process.env.PORT || 4000
const { users } = require('./state')
var counter = users.length+1;

/* BEGIN - create routes here */

let newUser = {
  id: 6,
  name: 'PeePee',
  occupation: 'Federal Boob Inspector',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTShirBiF989tESHmrZ-89FjsJrlTsMJMjRt864q_nHA0Cd3KDp'
}


app.get('/users', (req, res) => {
  res.json(users)
})


app.get('/users/:userId', (req, res) => {

  let user = users.find(user => {
    return user._id == req.params.userId
  })
  console.log(user)
  res.json(user)
  

})

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', function (req, res) {
  req.body._id = counter
  counter++
  users.push(req.body)
  console.log(req.body)
  res.json(users[users.length - 1]);

})

app.put('/users/:userId', function (req, res) {
    // app.set('name', 'Justin Barsalou')
    
    let index = users.findIndex(user => {
      return user._id == req.params.userId
    })
    users[index].name = 'Justin Barsalou'
    res.json(users[index])
    
})


app.delete('/users/:userId', function (req, res) {
  // users.shift()
  // res.json(users)

  let delIndex = users.findIndex(user => {
    return user._id == req.params.userId
  })
  users.splice(delIndex, 1)
  res.json(users)

})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))