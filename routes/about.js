const express = require('express');
const router = express.Router();

//req controllers
const controllerabout = require('../controllers/controllerabout')


//Routes

router.get('/', controllerabout.list);
// router.get('/1', controllerabout.list1);
// router.get('/2', controllerabout.list2);
// router.get('/3', controllerabout.list3);
// router.get('/4', controllerabout.list4);
// router.get('/5', controllerabout.list5);
// router.get('/6', controllerabout.list6);

router.get('/:userId', controllerabout.getById);

// router.post('/', controllerabout.postNewUser)
router.post('/', controllerabout.postNewUser)

// router.put('/1', controllerabout.put1)
router.put('/:userId', controllerabout.putById)


router.delete('/1', controllerabout.delete1)

router.delete('/:userId', controllerabout.deleteById)


//Export
module.exports = router;
