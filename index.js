const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const logger = require("./middleware/logger");
const { users } = require("./state");
let counter = users.length + 1;

// //harcoded user
// const hardCodeUser = {
//   name: " Regins Dubovitskaya",
//   ocupation: " Tv Host",
//   avatar: "blah blah blah"
// };

/* BEGIN - create routes here */

// init middleware function
// app.use(logger);

//body Parser Using Middleware newest express extension instead of body-parser package
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//home directory, redirecting to users
app.get("/", function(req, res) {
  res.redirect("/users");
});

//gets All users
app.get("/users", (req, res) => res.json(users));

// get single user by Id
app.get("/users/:id", (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter(user => user._id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

// //adding usser from hardcoded user

// app.post("/users", (req, res) => {
//   const newMember = {
//     _id: counter++,
//     name: hardCodeUser.name,
//     occupation: hardCodeUser.ocupation,
//     avatar: hardCodeUser.avatar
//   };
//   users.push(newMember);
//   res.json(newMember);
// });

//creating user by client
app.post("/users", (req, res) => {
  const newMember = {
    _id: counter++,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };

  if (!newMember.name || !newMember.occupation || !newMember.avatar) {
    return res
      .status(400)
      .json({ msg: `Please fill up name, ocupation and avatar ` });
  }
  users.push(newMember);
  res.json(users);
});

//Update user
app.put("/users/:id", (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id));
  if (found) {
    const updUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name;
        user.occupation = updUser.occupation
          ? updUser.occupation
          : user.occupation;
        user.avatar = updUser.avatar ? updUser.avatar : user.avatar;
        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

//Delete user
app.delete("/users/:id", (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "User Deleted",
      users: users.filter(user => user._id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
