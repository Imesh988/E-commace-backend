const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

router.post('/create', roleController.create);
router.get('/all', roleController.getAllRole);
router.put('/update/:roleId', roleController.roleUpdate);
router.delete('/delete/:roleId', roleController.roleDelete);

module.exports = router;