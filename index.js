
const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const idFilter = req => users => users._id === parseInt(req.params.id);


// let counter = users.length;
// while (counter <= users.length-1) {
//   console.log(counter);
//   counter = counter + 1;
// }

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
})

// app.get('/users/:id', (req, res) => {

//   res.json(users[0])
// })

app.get('/users/:id', (req, res) => {
  const found = users.some(idFilter(req));

  if (found) {
    res.json(users.filter(idFilter(req)));
  } else {
    res.json({ msg: "not found" });
  }
});


app.post('/users', (req, res) => {
  // let newUser = {"_id":6,"name":"Charlie Brown","occupation":"cartoon","avatar":"https://www.google.com"};
  let newUser = req.body
  console.log(newUser)
  users.push(newUser)
  res.json(users)
})

// app.put('/users/1', (req, res) => {
//   if(users._id === 1 ){
//     users.name = "!!!"
//   }
//   res.json(users[0])
// })

// app.put('/users/1', (req, res) => {
 

//   if (users._id === 1) {
//     users.forEach((user, i) => {
//       if (idFilter(1)(user)) {

//         const updUser = {...user, ...2};
//         users[i] = updUser
//         res.json({ msg: 'Member updated', updUser });
//       }
//     });
//   }
// });

// app.put('/users/:id', function (req, res) {
//   const id = parseInt(req.params.id)
//   // console.log(id)
//   // let  = req.body.name
//   let myFunc = users.forEach((user, i) => {
//     const updUser = {...user, ...req.body};
//     users[i] = updUser
//    })
//   console.log(myFunc)
//   res.json(users);
// });

app.put('/users/:id', (req, res) => {
  const found = users.some(idFilter(req));

  if (found) {
    users.forEach((user, i) => {
      if (idFilter(req)(user)) {

        const updUser = {...user, ...req.body};
        users[i] = updUser
        res.json(users);
      }
    });
  } else {
    res.json({ msg: 'not found'});
  }
});

// app.delete('/users/:userId', (req, res) => {
//   const id = parseInt(req.params.id)
//   users.splice(id-1, 1)
//   console.log(users)
//   res.json(users)
//   res.send("DELETED")
// })

app.delete('/users/:id', (req, res) => {
  const found = users.some(idFilter(req));

  if (found) {
    res.json({
      msg: `Member ${req.params.id} deleted`,
      members: users.filter(user => !idFilter(req)(user))
    });
  } else {
    res.json({ msg:'not found' });
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))