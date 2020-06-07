const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const { users } = require("./state");

/* BEGIN - create routes here */

// ---------------

// Part 1: Basic routes

// GET /users:
app.get("/users", (req, res) => {
  res.json(users);
});

// ---------------

// // GET /users/1:
// app.get("/users/1", (req, res) => {
//   res.json(users[0]);
// });

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

// // // PUT /users/1:
// app.put("/users/1", (req, res) => {
//   users[0].occupation = "Special Agent";
//   res.json(users[0]);
//   res.send({ msg: "Success, user updated!" });
// });

// ---------------

// DELETE /users/1
// app.delete("/users/1", (req, res) => {
//   users.shift();
//   res.send({ msg: "User Deleted!" });
// });

// ---------------

// Part 2. Body-parser module

app.post("/users", (req, res) => {
  let counter = users.length + 1;
  const newUser = req.body;
  newUser._id = counter;
  users.push(newUser);
  res.json({ msg: "New User Added!", user: newUser });
});

// ---------------

// Part 3. Use path variables

// GET /users/1 => GET /users/:userId
app.get("/users/:userId", (req, res) => {
  const userFound = users.some(
    (user) => user._id === parseInt(req.params.userId)
  );

  if (userFound) {
    res.json(users.filter((user) => user._id === parseInt(req.params.userId)));
  } else {
    res
      .status(400)
      .json({ msg: `User with the ID of ${req.params.userId} not found!` });
  }
});

// ---------------

// PUT /users/1 => PUT /users/:userId
app.put("/users/:userId", (req, res) => {
  const userFound = users.some(
    (user) => user._id === parseInt(req.params.userId)
  );

  if (userFound) {
    const updUser = req.body;
    users.forEach((user) => {
      if (user._id === parseInt(req.params.userId)) {
        user.name = updUser.name ? updUser.name : user.name;
        user.occupation = updUser.occupation
          ? updUser.occupation
          : user.occupation;
        user.avatar = updUser.avatar ? updUser.avatar : user.avatar;

        res.json({ msg: "Success, user updated!", user });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `User with the ID of ${req.params.userId} not found!` });
  }
});

// ---------------

// DELETE /users/1 => DELETE /users/:userId
app.delete("/users/:userId", (req, res) => {
  const userFound = users.some(
    (user) => user._id === parseInt(req.params.userId)
  );

  if (userFound) {
    res.json({
      msg: "User Deleted!",
      users: users.filter((user) => user._id === parseInt(req.params.userId)),
    });
  } else {
    res
      .status(400)
      .json({ msg: `User with the ID of ${req.params.userId} not found!` });
  }
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
