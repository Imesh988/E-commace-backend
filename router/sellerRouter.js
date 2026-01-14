const express = require('express');
const router = express.Router();
const sellerController = require('../controller/sellerController');

router.post('/create', sellerController.sellerCreate);
router.get('/all', sellerController.getAllSeller);
router.put('/update/:sellerId', sellerController.sellerUpdate);
router.delete('/delete/:sellerId', sellerController.sellerDelete)
router.get('/id/:sellerId', sellerController.getSellerId)
router.get('/text/:text', sellerController.getSellertext)

module.exports = router;