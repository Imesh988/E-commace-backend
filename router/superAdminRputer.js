const express = require('express');
const router = express.Router();
const superAdminController = require('../controller/superAdminController');

router.post('/create', superAdminController.superAdminCreate);
router.get('/all', superAdminController.getAllSuperAdmin);
router.get('/search/:text', superAdminController.getSuperAdminText);
router.put('/update/:superAdminId', superAdminController.superAdminUpdate);
router.delete('/delete/:superAdminId', superAdminController.superAdminDelete);
router.post('/login', superAdminController.superAdminLogin);

module.exports = router;
