
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { users } = require('./state')
let _id = users.length;


// PART 1: BASIC ROUTES


app.get('/users', function (req, res) {
  res.json(users);
});

// app.get('/users/:position', function (req, res) {
//   let position = parseInt(req.params.position);
//   res.json(users[position-1]);
// });




app.post('/users', function (req, res) {
  const newUser = {
    "_id": 6,
    "name": "David Hraban",
    "occupation": "Executive",
    "avatar": "https://media-exp1.licdn.com/dms/image/C4E03AQECKhf1ROvkNQ/profile-displayphoto-shrink_800_800/0?e=1590624000&v=beta&t=r21glQeIATxxfXvcdUfLanqPvE20RLDMuKHFa75Oxow"
  };
  users.push(newUser);
  res.json(users[users.length-1]);
});





app.put("/users/:position", (req, res) => {

  let position = parseInt(req.params.position);
  let user = users[position-1];
  let update = req.body;

  let updates = Object.entries(update);

  for(let i = 0; i< updates.length;i++){
    let key = updates[i][0];
    let value = updates[i][1];
    user[key] = value;
  };
  
  res.json(user);

});




// app.delete("/users/:position", (req, res) => {

//   let position = parseInt(req.params.position);
//   let userIndex = position - 1; 
  
//   users.splice(userIndex, 1);

//   res.json(users);

// });



// PART 2: BODY-PARSER MODULE


app.post("/users", function (req, res) {
  const newUser = req.body;
  _id++;
  newUser._id = _id;
  users.push(newUser);
  res.json(newUser);
});



// PART 3: USE PATH VARIABLES

app.get('/users/:userId', function (req, res) {
  
  let selectedUser;

  let userId = parseInt(req.params.userId);
  for(let i = 0; i< users.length;i++){
    if (users[i]._id === userId) {
      selectedUser = users[i];
  }
}
  res.json(selectedUser);

});


app.put("/users/:userId", (req, res) => {

  let userId = parseInt(req.params.userId);
  let selectedUser;

  for(let i = 0; i< users.length; i++) {
    if (users[i]._id === userId) {
      selectedUser = users[i];
  }
}

  let recievedInfo = req.body;
  let updates = Object.entries(recievedInfo);

  for(let i = 0; i< updates.length;i++){
    let key = updates[i][0];
    let value = updates[i][1];
    selectedUser[key] = value;
  };
  
  res.json(users);

});


app.delete("/users/:userId", (req, res) => {
  let id = parseInt(req.params.userId);
  let userIndex = users.findIndex(users => users._id === id);
  users[userIndex].isActive = false;
  res.send("deleted");
});




app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))