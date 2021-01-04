
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 4000

//Routers
const indexRouter = require('./routes/index')

const aboutRouter = require('./routes/about')


/* BEGIN - create routes here */
app.use('/', indexRouter);

app.use('/about', aboutRouter);

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))