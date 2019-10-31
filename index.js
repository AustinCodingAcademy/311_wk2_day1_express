const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const app = express();
const port = process.env.PORT || 4000;

// Body Parser boilerplate
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { users } = require("./state");

// user length for id counter
let idNumBase = users.length + 1;

/* BEGIN - create routes here */

// All Users
app.get("/users", (req, res) => res.json(users));

// Users based on ID
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  // res.json(users[userId - 1]);
  res.json(users.find(user => user._id === userId));
});

// Returns New Posted User
// app.post('/users', (req, res) => {
//   let happy = {
//     "_id": 6,
//     "name": 'Happy Gilmore',
//     "occupation": 'Hockey Player',
//     "avatar": 'https://www.imdb.com/title/tt0116483/mediaviewer/rm692033536'
//   };
//   users.push(happy);
//   res.json(happy);
// });

app.post("/users", jsonParser, function(req, res) {
  const newUser = {
    _id: idNumBase++,
    name: req.body.name,
    email: req.body.occupation,
    avatar: req.body.avatar
  };
  users.push(newUser);
  res.json(users);
});

app.put("/users/:id", jsonParser, (req, res) => {
  const userId = parseInt(req.params.id);

  const uniqueUser = users.find(user => user._id === userId)
  
    uniqueUser.name = req.body.name;
    uniqueUser.mail = req.body.occupation;
    uniqueUser.avatar = req.body.avatar;

    res.json(uniqueUser);
  });

// app.delete("/users/:id", (req, res) => {
//   users.splice(0, 1);
//   res.send("Deleted First User");
// });

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const uniqueUser = users.find(user => user._id === userId);
  // console.log(userId, uniqueUser);

  uniqueUser.isActive = false;
  res.send('deleted')
  // res.json(users);
}); 


/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
