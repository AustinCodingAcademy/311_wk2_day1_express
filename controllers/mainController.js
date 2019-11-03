// allows access to data file
const { users } = require("../state");

// gets all users
function user(req, res) {
  return res.json(users);
}

// gets single user
function singleUser(req, res) {
  let user = users.find(user => user._id === parseInt(req.params.id));
  return res.json(user);
}

// creates new user
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

// updates user
function putUser(req, res) {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.occupation = updateUser.occupation
          ? updateUser.occupation
          : user.occupation;
        user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;

        res.json({ msg: "User updated successfully", user });
      }
    });
  }
}

// deletes user
function deleteUser(req, res) {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found) {
    let user = users.find(user => user._id === parseInt(req.params.id));
    user.isActive = false;
    res.json({
      Message: "User Deleted",
      user
    });
  }
}

// exports functions/methods to be used in another file
module.exports = { user, singleUser, userPost, putUser, deleteUser};
