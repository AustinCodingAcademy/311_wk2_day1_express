const { users } = require('../state')

function user (req, res) {
  return res.json(users)
}

module.exports = user;
