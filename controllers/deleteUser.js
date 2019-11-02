const { users } = require('../state');

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

module.exports = deleteUser;