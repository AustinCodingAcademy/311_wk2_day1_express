const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const port = process.env.PORT || 4000;

const { users } = require("./state");
const jsonParser = express.json();
let count = users.length + 1;

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(jsonParser);

const connection = mysql.createConnection(
  // 'mysql://artfrog:myFrogg3r!@localhost/test_db'
  // OR an object:
  {
    user: 'test',
    password: 'password',
    database: 'testdb'
  });



connection.connect(function (err) {
  if (err) {
    console.log('********** ERROR CONNECTING *************');
    throw err;
  }
  console.log('connected..');
})

app.post('/teacher', (req, res) => {
  let sql = `INSERT INTO teachers (first_name, last_name) VALUES ('${req.body.first}', '${req.body.last}');`;
  console.log(req.body);

  connection.query(sql, (err) => {
    if (err) {
      console.log('********** ERROR REQUESTING *************');
      throw err;
    }
    res.send('success');
  })
  connection.end();
})


/* BEGIN - create routes here */
// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});
// Get single user by id
app.get("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let found = users.find(user => user._id === id);
  if (found)
    res.json(found);
  else
    res.status(400).send(`There is no user with id: ${id}`);
});
// Post a new user from body of client input
app.post("/users", jsonParser, (req, res) => {
  const newUser = {
    _id: count,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser);
  count++;
  res.json(newUser);
});
// Update a current user
app.put('/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let found = users.find(user => user._id === id)
  if (found) {
    found.occupation = "poop scooper";
    res.json(found);
  }
  else
    res.status(400).send(`There is no user with id: ${id}`);
})
// Make a user inactive
app.delete('/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let found = users.find(user => user._id === id);
  if (found) {
    found.isActive = false;
    res.send('deleted');
  }
  else
    res.status(400).send(`There is no user with id: ${id}`);
  // *** Alternative code - delete the user entirely.
  // let found = users.findIndex(user => user._id === id);
  // if (found !== -1) {
  //   users.splice(found, 1);
  //   res.send('deleted.');
  // }
  // else
  //   res.status(400).send(`There is no user with id: ${id}`);
})
/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
