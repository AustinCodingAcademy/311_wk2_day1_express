const express = require("express");
const bodyParcer = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const moment = require("moment");

const { users } = require("./state");

/* BEGIN - create routes here */

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}${moment().format()}`
  );
  next();
};
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  return res.json(users);
});
app.get("/users/1", (req, res) => {
  return res.json(users[0]);
});
app.post("/users", (req, res) => {
  let newUser = {
    _id: 6,
    name: "Jon Snow",
    occupation: "blah",
    avatar:
      "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
  };
  users.push(newUser);
  res.send(newUser);
});
app.put("/users/1", (req, res) => {
  users[0].name = "test test";
  res.send(users[0]);
});
app.delete("/users/1", (req, res) => {
  users.shift();
  res.send(users);
});
app.use(bodyParcer.json());
app.post("/users", (req, res) => {
  res.send(req.body);
});
app.get("/users/:userId", (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId));
  if (found) {
    res.json(users.filter(user => user._id === parseInt(req.params.userId)));
  } else {
    res
      .status(400)
      .json({ msg: `No user with the id of ${req.params.userId}` });
  }
});
app.put("/users/:userId", (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId));
  if (found) {
    const updUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.userId)) {
        user.name = updUser.name ? updUser.name : user.name;

        res.json({ msg: "User was updated" });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No user with the id of ${req.params.userId}` });
  }
});

// ----deleted user-----

app.get("/users/:userId", (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId));
  if (found) {
    res.json({
      msg: "User Deleted",
      users: users.filter(user => user._id !== parseInt(req.params.userId))
    });
  } else {
    res
      .status(400)
      .json({ msg: `No user with the id of ${req.params.userId}` });
  }
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
