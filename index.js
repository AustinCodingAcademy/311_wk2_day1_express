
const express = require('express')

const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(express.json());

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/1', (req, res) => {
  res.json(users[0])
})


app.post('/users', (req, res) => {
  let newUser = {"_id":6,"name":"Charlie Brown","occupation":"cartoon","avatar":"https://www.google.com"};
  users.push(newUser)
  res.json(users)
})

// app.put('/users/1', (req, res) => {
//   if(users._id === 1 ){
//     users.name = "!!!"
//   }
//   res.json(users[0])
// })

// app.put('/users/1', (req, res) => {
 

//   if (users._id === 1) {
//     users.forEach((user, i) => {
//       if (idFilter(1)(user)) {

//         const updUser = {...user, ...2};
//         users[i] = updUser
//         res.json({ msg: 'Member updated', updUser });
//       }
//     });
//   }
// });

app.put('/users/1', function (req, res) {
  const item = users.find(users => users._id === req.body.id);
  const index = users.indexOf(users);
  users[index] = req.body;
  res.json(users);
});


app.delete('/users/1', (req, res) => {

  res.send("DELETED")
})



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))