const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');

router.post('/create', productController.saveProduct);
router.get('/all', productController.getAllProduct);
router.get('/find/:productId', productController.getProductById);
router.get('/search/:text', productController.getProductByText);
router.put('/update/:productId', productController.updateProduct);
router.put('/delete/:productId', productController.deleteProduct);


module.exports = router;