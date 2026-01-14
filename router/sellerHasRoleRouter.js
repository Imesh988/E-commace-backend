const express = require('express');
const router = express.Router();
const sellerHasRoleController = require('../controller/sellerHasRoleController');

router.post('/create', sellerHasRoleController.sellerHasRoleCreate);
router.get('/all', sellerHasRoleController.getAllSellerhasRole);
router.get('/id/:sellerHasRoleId', sellerHasRoleController.getSellerHasRoleId);
router.get('/search/:text', sellerHasRoleController.getSellerHasRoleText);
router.put('/update/:sellerHasRoleId', sellerHasRoleController.sellerHasRoleUpdate);
router.delete('/delete/:sellerHasRoleId', sellerHasRoleController.sellerHasRoleDelete);


module.exports = router;