// Week 2 Day #1 - Express Practice - Justin Essler



const express = require('express')
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 4000

const { users } = require('./state')
var counter = users.length+1;

//   * GET /users
//     * Give your server the ability to respond to a GET request with a path "/users" 
//     * and return the users array from state.js
//     * Ex. `res.json(users)`
app.get('/users', (req, res) => {
  res.json(users);
})

//   * GET /users/1
//     * Give your server the ability to respond to a GET request with a path "/users/1" 
//     * and return the first user object from the users array from state.js
app.get('/users/1', (req, res) => {
  res.json(users[0])
})

//   * POST /users
//     * Give your server the ability to respond to a POST request with a path "/users" and add a hard coded user object to the users array from state.js. 
//     * Use `res.json()` to send the last user in the array (should be the new one) back to the client.
//     * If you do another GET request you should see this added
//     * You will need to create the hard coded user mentioned above
// app.post('/users', (req, res) => {
//   let newUser = {
//     "_id": 6,
//     "name": "Rick",
//     "occupation": "Gamer",
//     "avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
//   }
//   users.push(newUser);
//   res.json(user[users.length -1])
//   res.send('success-jte')

// })

//   * PUT /users/1
//     * Give your server the ability to respond to a PUT request with a path "/users/1" and just change any key value (ex. name, occupation) 
//     * on the first user object in the users array in state.js. Use `res.json()` to send this user back to the client.
app.put("/users/1", (req, res) => {
  users[0].name = "Tim";
  res.json(users[0]);
  res.send('success-jte')
})

//   * DELETE /users/1
//     * Give your server the ability to respond to a DELETE request with a path "/users/1" 
//     * and remove the first item from the users array. Use `res.send()` to send back a messsage, "deleted"
app.delete("/users/1", (req, res) => {
  users.shift();
  res.send("deleted -jte")
})


// ## Part 2. Body-parser module

// * Require the `body-parser` module on the line below `require('express')`. (it has already been npm installed)
//  * Give your server the ability to handle a POST request with a path "/users" 
//   * and add the data from the client to the users array
//    * This means you will be adding `req.body`. Console log this to see what you get 
//     * and don't forget to send an actual body with the request in Postman
//      * Assign an _id property to the user object that is a number that increments by 1 each time.
//       * To do this, set a variable called counter near the `{ users }` variable. Start it at the length of the users array
//        * Use `res.json()` to send the user object back to the client. (if you do another GET request you should see this added)

app.post('/users', (req, res) => {
  let user2 = req.body;
  user2._id = counter;
  users.push(user2);
  res.send('success-jte')
  res.json(req.body)
})



// ## Part 3. Use path variables * Alter the following routes:

//   * GET /users/1 => GET /users/:userId
//     * Give your server the ability to respond to a GET request with a path `/users/:userId` 
//     * and return the user object from the users array that has the _id == userId
app.get('/users/:userId', (req, res) => {
  let myid = req.params.userId
  // console.log(myid)
  // res.json(users[myid-1])

  let foundUser = users.find(x => x._id == myid);
  res.json(foundUser);
})


//   * PUT /users/1 => PUT /users/:userId
//     * Give your server the ability to respond to a PUT request with a path `/users/:userId` 
//     * and just change any key value on the user object with this _id 
app.put("/users/:userID", (req, res) => {
  let myid = req.params.userId
  users[myid].name = "Johnny";
  res.json(users[myid]);
  res.send('success-jte')
})



//   * DELETE /users/1 => DELETE /users/:userId
//     * Give your server the ability to respond to a DELETE request with a path `/users/:userId` and find the user with this id from the array. 
//     * Give this user object a new key value `isActive: false`. Use `res.send()` to send back a messsage, "deleted"
app.delete("/users/:userID", (req, res) => {
  let myid = req.params.userId
  users._id[myid].shift();
  res.send("deleted -jte")
})




// listen for traffic, start the server
app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))

