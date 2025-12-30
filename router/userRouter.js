const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create',userController.saveUser);
router.get('/all',userController.getAllUser);
router.get('/find/:userId',userController.getUserById);
router.get('/search/:text',userController.getUserText);
router.put('/update/:userId',userController.updateUser);
router.delete('/delete/:userId',userController.userDelete);

module.exports = router;
