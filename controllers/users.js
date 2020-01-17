const { users }  = require('../state')
let counter = users.length

const users_get_all = (req, res) => {
  return res.json(users)
 }

const users_by_id = (req, res) => {
  const found =  users.some(users => users._id === parseInt(req.params._id));

  if(found) {
  res.json(users.filter(users => users._id === parseInt(req.params._id)))
  } else {
    res.status(400).json({msg: `No members with the id of ${req.params._id}`})
  } 
 }

 //let the theIdImLookingFor = req.params.userId;
// console.log(theIdImLookingfor);
//THe variables are up for you
//let users = users.find(u=>u._id == theIdImLookingfor)

const post_user = (req, res) => {
  const newUser = {
    _id: counter += 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
  }
  if(!newUser.name || !newUser.occupation) {
    res.status(400).json({msg: 'Please include a name and occupation'});
  }
  users.push(newUser);
  res.json(users)
}

const update_user = (req, res) => {
  const found = users.some(users => users._id === parseInt(req.params._id));

  if(found) {
    const updUser = req.body;
    users.forEach(users => {
      if(users._id === parseInt(req.params._id)) {
        users.name = updUser.name ? updUser.name : users.name;
        users.occupation = updUser.occupation ? updUser.occupation : users.occupation;
        users.avatar = updUser.avatar ? updUser.avatar : users.avatar;

        res.json({msg: 'Member updated', users})
      }
    });
  } else {
    res.status(400).json({msg: `No member with the id of ${req.params._id}`});
  }
 }

 const delete_user = (req, res) => {
  const found =  users.some(users => users._id === parseInt(req.params._id));

  if(found) {
  res.json({msg: 'deleted',
   users: users.filter(users => users._id !== parseInt(req.params._id))
  });
  } else {
    res.status(400).json({msg: `No members with the id of ${req.params._id}`})
  } 
 }

 module.exports = {
  users_get_all,
  users_by_id,
  post_user,
  update_user,
  delete_user
}