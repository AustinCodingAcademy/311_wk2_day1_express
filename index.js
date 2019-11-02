const express = require('express');

//set up express app
const app = express();

// Enable body parser for application/json
const bodyParser = require('body-parser')
app.use(bodyParser.json())


/* BEGIN - create routes here */

const routes = require('./routes/users')
app.use(routes)

/* END - create routes here */
const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))