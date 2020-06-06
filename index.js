const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const { users } = require("./state");
let counter = users.length + 1;

/* BEGIN - create routes here */

// ---------------

// Part 1: Basic routes

// GET /users:
app.get("/users", (req, res) => {
  res.json(users);
});

// ---------------

// GET /users/1:
app.get("/users/1", (req, res) => {
  // const userId = req.params.id;
  res.json(users[0]);
});

// ---------------

// POST /users:
// app.post("/users", (req, res) => {
//   users.push({
//     _id: 6,
//     name: "John Dillinger",
//     occupation: "Bank Robber",
//     avatar:
//       "https://en.wikipedia.org/wiki/John_Dillinger#/media/File:John_Dillinger_mug_shot.jpg",
//   });
//   res.json(users[5]);
// });

// ---------------

// // PUT /users/1:
app.put("/users/1", (req, res) => {
  users[0].occupation = "Special Agent";
  res.json(users[0]);
  res.send({ msg: "Success, user updated!" });
});

// ---------------

// DELETE /users/1
app.delete("/users/1", (req, res) => {
  users.shift();
  res.send({ msg: "User Deleted!" });
});

// ---------------

// Part 2. Body-parser module

app.post("/users", (req, res) => {
  let newUser = req.body;
  newUser._id = counter;
  users.push(newUser);
  res.send({ msg: "New User Added!" });
  res.json(req.body);
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.post("/users", (req, res) => {
//   const newUser = {
//     _id: req.body._id,
//     name: req.body.name,
//     occupation: req.body.occupation,
//     avatar: req.body.avatar,
//   };

//   users.push(newUser);
//   res.json(users[5]);
// });

// ---------------

// Part 3. Use path variables

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
