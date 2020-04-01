 
const express = require("express");
 
 
const body = require("body-parser");
 
const app = express();
 
const port = process.env.PO
RT || 4000;
 

 
 
const { users } = require("./state");
 

 
 
/* BEGIN - create routes here */
 
app.get("/users", (req, res) => {
 
 return res.json(users);
 
});
 

 
 
app.get("/users/1", (req, res) => {
 
 res.json(users[0]);
 
});
 

 
 
app.post("/users", (req, res) => {
 
 let newUser = {
 
   _id: 6,
 
   name: "Joe Rogan",
 
   occupation: "comedian",
 
   avatar:
 
     "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
 
 };
 
 users.push(newUser);
 
 res.json(users);
 
});
 
app.put("/users/1", (req, res) => {
 
 users[0].occupation = "Kung Fu Fighter";
 
 res.json(users);
 
});
 
app.delete("/users/1", (req, res) => {
 
 users.splice(0, 1);
 
 res.json(users);
 
 res.send("user 1 deleted");
 
});
 
//Part two
 
console.log("lol");
 
//Part three
 
app.get("/users/:id", (req, res) => {
 
 const id = req.params.id;
 
});
 
app.put("/users/:id", (req, res) => {
 
 const id = req.params.id;
 
 let contact = contact.filter(user => {
 
   return (user.id = req.id);
 
 })[0];
 
 const index = user.indecOf(user);
 
 const keys = object.keys(req.body);
 

 
 
 keys.forEach(key => {
 
   contact[key] = req.body[key];
 
 });
 
 user[index] = user;
 
 res.json(user);
 
});
 
app.delete("/users/:id", (req, res) => {
 
 const id = req.params.id;
 
 let contact = contact.filter(user => {
 
   return (user.id = req.id);
 
 })[0];
 
 const index = user.indexOf(user);
 
 user.splice(index, 1);
 

 
 
 res.json(user);
 
});
 
/* END - create routes here */
 

 
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
