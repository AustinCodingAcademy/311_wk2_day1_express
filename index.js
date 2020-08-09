const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const { users } = require('./state')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))