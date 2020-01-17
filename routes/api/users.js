const express = require('express');
const router = express.Router();
const { users }  = require('../../state');
const userController = require('../../controllers/users')


router.get('/', userController.users_get_all);

router.get('/:_id', userController.users_by_id);
 
router.post('/', userController.post_user);

router.put('/:_id', userController.update_user);
 
router.delete('/:_id', userController.delete_user);


 module.exports = router;