
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000


const { users } = require('./state')
app.use(bodyParser.json())

/* BEGIN - create routes here */
app.get('/users',(req, res) => {
  res.json(users);
  
});

app.get('/users/:id', (req, res) => {
  let id = users.filter(x => x._id == req.params.id)
  res.json(id);
});

app.post('/users', (req, res) => {
    let hardCode = {
    "_id": 6,
    "name": "Chris Cornell",
    "occupation": "Artist",
    "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Chris_Cornell_-_2012.jpg/800px-Chris_Cornell_-_2012.jpg"
    }
  users.push(hardCode);
  res.json(hardCode);
  console.log(req.body);
    });

    app.put('/users/:userId', (req, res) => {
      let id = users.filter(x => x._id == req.params.userId);
      id[0].name = 'Norm MacDonald';
      res.json(id[0]);
    })
    app.delete('/users/:id', (req, res) => {
      let id = users.filter(users => users._id == req.params.userId);
      let name = id[0].name;
      id[0].isActive = false;
      res.send(`Deleted User ${name}`);
    })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))