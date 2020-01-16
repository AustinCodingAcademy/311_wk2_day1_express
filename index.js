
const express = require('express')
const app = express()
const port = process.env.PORT || 4000


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/users', require('./routes/api/users'))
/* BEGIN - create routes here */



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))