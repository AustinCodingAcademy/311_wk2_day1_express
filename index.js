const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");

/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (id > 0 && id <= users.length)
    res.json(users[id - 1]);
  else
    res.status(404).send(`There is no user with id: ${id}`);
});
app.post("/users", (req, res) => {
  users.push({
    _id: 6,
    name: "Spongebob Squarepants",
    occupation: "absorbent and yellow and porous",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
  });
  res.json(users[users.length - 1]);
});
app.put('/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  if (id > 0 && id <= users.length) {
    users[id - 1].occupation = "poop scooper";
    res.json(users[id - 1]);
  }
  else
    res.status(404).send(`There is no user with id: ${id}`);
})
app.delete('/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  if (id > 0 && id <= users.length) {
    users.splice(id - 1, 1);
    res.send('deleted.');
  }
  else
    res.status(404).send(`There is no user with id: ${id}`);
})
/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
