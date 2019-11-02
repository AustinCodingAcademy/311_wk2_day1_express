const { users } = require('../state')

function singleUser (req, res){
  let user = users.find(user => user._id === parseInt(req.params.id))
  return res.json(user)
}

module.exports = singleUser;
