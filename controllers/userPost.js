const { users } = require("../state");

function userPost(req, res) {
  const newUser = {
    _id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };
  users.push(newUser);
  res.json(users);
}

module.exports = userPost;
