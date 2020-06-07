const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");
let counter = users.length;

app.use(express.json());

/* PART 1 */
/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  res.json(users);
});

// app.get('/users/1', (req, res) => {
//   res.json(users[0]);
// });

// app.post('/users', (req, res) => {
//   let newUser = {
//     "_id": 6,
//     "name": "Han Solo",
//     "occupation": "Pilot",
//     "avatar": "https://www.starwars.com/databank/han-solo"
//   }

//   users.push(newUser);
//   res.json(users[users.length - 1]);
// });

// app.put("/users/1", (req, res) => {
//   users[0].name = "Cale Dooper";
//   users[0].occupation = "CIA Agent";
//   res.json(users[0]);
// });

// app.delete("/users/1", (req, res) => {
//   users.shift();
//   res.send("Deleted");
// });

/* PART 2 */

app.post("/users", (req, res) => {
  let newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
  };

  users.push(newUser);

  counter++;

  res.json(newUser);
});

/* PART 3 */

app.get("/users/:userId", (req, res) => {
  res.json(users.filter((user) => user._id == req.params.userId));
});

app.put("/users/:userId", (req, res) => {
  users.forEach((user) => {
    if (user._id == req.params.userId) {
      user.name = "Cale Dooper";
      user.occupation = "CIA Agent";
      res.json(user);
    }
  });
});

app.delete("/users/:userId", (req, res) => {
  users.forEach((user) => {
    if (user._id == req.params.userId) {
      user.isActive = "false";
    }
    res.send("Deleted");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
