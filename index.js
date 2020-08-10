const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const { users } = require('./state')
let counter = users.length;

let getNewId = () => { return (counter = counter + 1); };

//needed so we can handle raw json data
app.use(express.json());
//needed so we can handle forms submision and url encoded data
app.use(express.urlencoded({ extended: false }));

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    res.json(users.filter(user => user._id == req.params.id));
})

app.post('/users', (req, res) => {
    let newUser = {
        _id: getNewId(),
        name: req.body.name,
        occupation: req.body.occupation,
        avatar: req.body.avatar
    };
    users.push(newUser);
    res.send(newUser)
})

app.put('/users/:i', (req, res) => {
    let id = req.params.i; //id from url
    let putUser = req.body;
    let n = users.findIndex(m => m._id == id) //get index of members array     
    users[n].name = putUser.name ? putUser.name : users[n].name;
    users[n].occupation = putUser.occupation ? putUser.occupation : users[n].occupation;
    users[n].avatar = putUser.avatar ? putUser.avatar : users[n].avatar;
    res.json(users[n]);
})

app.delete('/users/:i', (req, res) => {
    let id = req.params.i; //id from url
    let n = users.findIndex(m => m._id == id) //get index of members array      
    users[n].isActive = false;
    res.json('deleted')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))