const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { users } = require("./state");
const counter = users.length;
/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  return res.json(users);
});
app.get("/users/:userId", (req, res) => {
  let id = users.filter(each => each._id == req.params.userId);
  console.log(id);
  let userObje = id[0];
  res.json(userObje);
});
// app.post("/users", function(req, res, next) {
//   let newUser = {
//     _id: 6,
//     name: "New Person",
//     occupation: "FBI Agent",
//     avatar: "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
//   };
//   users.push(newUser);
//   return res.json(newUser);
// });

app.post("/users", function(req, res) {
  let user = req.body;
  user._id = counter + 1;

  users.push(user);
  res.json(user);

  console.log(req);
});

// app.put("/users/1", (req, res) => {
//   users[0].name = "ricky";
//   return res.send(users[0]);
// });
app.put("/users/:userId", (req, res) => {
  let id = users.filter(each => each._id == req.params.userId);
  let userObje = id[0];
  userObje.occupation = "cop";
  res.json(userObje);
});

// app.delete("/users/1", (req, res) => {
//   users.pop();
//   return res.send("deleted");
// });

app.delete("/users/:userId", (req, res) => {
  let id = users.filter(each => each._id == req.params.userId);
  let userObje = id[0];
  userObje.isActive = false;
  res.send("delete");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
