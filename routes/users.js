const express = require('express')
const router = express.Router()

// gets access to controller functions/methods
const controller = require('../controllers/mainController')

// Route to get all users
router.get('/users', controller.user)

// Route to get single user
router.get('/users/:id', controller.singleUser)


// Route to make a post
router.post('/users', controller.userPost)


// Update user
router.put('/users/:id', controller.putUser)


// Delete user
router.delete('/users/:id', controller.deleteUser)

module.exports = router;