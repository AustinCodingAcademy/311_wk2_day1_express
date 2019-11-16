const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");

/* BEGIN - create routes here */
app.use(bodyParser.json());
app.get("/users", function(req, res) {
  res.json(users);
});

// app.get("/users/1", function(req, res) {
//   res.json(users[0]);
// });

// app.post("/users", (req, res) => {
//   let newUser = {
//     _id: 6,
//     name: "Dale Cooper2",
//     occupation: "FBI Agent2"
//   };
//   users.push(newUser);
//   res.json(users);
// });

// app.put("/users/1", (req, res) => {
//
// const { name, occupation } = req.body;
// console.log(name);
// console.log(occupation);
// users[id - 1].name = name;
// users[id - 1].occupation = occupation;
// res.json(users[0]);
//   }

//   res.json(users[0]);
// });

// app.delete("/users/1", (req, res) => {
//   users.shift();

//   res.json("Deleted");
// });

app.post("/users", (req, res) => {
  let body = req.body;
  console.log(body);

  res.json(users);
});

//keep getting the entire array instead of just the one
app.get("/users/:userId", function(req, res) {
  const id = parseInt(req.params.userId);
  res.json(users[id - 1]);
});

app.put("/users/:userId", (req, res) => {
  const id = parseInt(req.params.userId);

  const { name, occupation } = req.body;
  console.log(name);
  console.log(occupation);
  users[id - 1].name = name;
  users[id - 1].occupation = occupation;
  res.json(users[id - 1]);
});

app.delete("/users/:userId", (req, res) => {
  const id = parseInt(req.params.userId);

  users[id - 1].isActive = false;
  console.log(users[id - 1]);

  res.send("Deleted");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
