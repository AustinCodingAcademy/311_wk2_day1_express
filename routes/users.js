const express = require('express')
const router = express.Router()
const user = require('../controllers/users')
const singleUser = require('../controllers/singleUser')
const userPost = require('../controllers/userPost')
const putUser = require('../controllers/putUser')
const deleteUser = require('../controllers/deleteUser')



// Route to get all users
router.get('/users', user)

// Route to get single user
router.get('/users/:id', singleUser)


// Route to make a post
router.post('/users', userPost)


// Update user
router.put('/users/:id', putUser)


// Delete user
router.delete('/users/:id', deleteUser)

module.exports = router;