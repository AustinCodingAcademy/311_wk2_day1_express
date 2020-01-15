
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
//* GET /users
// * Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
// * Ex. `res.json(users)`

app.get('/users', (request, response)=>{
  response.json(users)
})

// * POST /users
// * Give your server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js. Use `res.json()` to send the last user in the array (should be the new one) back to the client.
// * If you do another GET request you should see this added
// * You will need to create the hard coded user mentioned above
const newUser = {
  _id: 6,
  name: "The Smoking Man",
  occupation: "Ominously Smoking",
  avatar: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F3%2F34%2FThe_Smoking_Man_%2528X-Files%2529.jpg%2F220px-The_Smoking_Man_%2528X-Files%2529.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCigarette_Smoking_Man&tbnid=mzgu5j95i60ACM&vet=12ahUKEwiY_qPmy4TnAhWDkq0KHSFHC7AQMygAegUIARDzAQ..i&docid=OFGXqdVn3yqktM&w=220&h=293&q=the%20smoking%20man%20x%20files&ved=2ahUKEwiY_qPmy4TnAhWDkq0KHSFHC7AQMygAegUIARDzAQ"
  }

  app.post('/users', (request, response)=> {
    users.push(newUser)
    response.send(newUser);
  })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))