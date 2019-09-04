
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

app.use((req, res, next) => {
  if(req.path === "/users" && req.method === "GET") {
    return res.json(users)
  }
  next();
});

app.use((req, res, next) => {
  if(req.path === "/users/1" && req.method === "GET") {
    return res.json(users/1)
  }
  next();
});



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))