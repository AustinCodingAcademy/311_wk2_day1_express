const { users } = require("../state");

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
  } else {
    res.status(400).json({ msg: `No User with id of ${req.params.id}` });
  }
}

module.exports = putUser;
