
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.use('/users', function (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

app.get('/users', function (req, res) {
  return res.json(users)
})

app.get('/users/:id(\\d+)', function(req, res) {
  // res = res.json(req.params.id);
  let usrID = parseInt(req.params.id);
  let user = users.find(arrObj => arrObj._id === usrID);
  // let user = users.find(usr => usr.id === res);
  // let id = req;
  // let user = users.find((usr) => usr._id === id);
  console.log(users);
  res.json(user);
         
})

app.post('/users', function(req, res) {
  // let _id = req.body.id;
  let name = req.body.name;
  let occupation = req.body.occupation;
  let avatar = req.body.avatar;

  res.json(users.lastIndexOf)
})





/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))