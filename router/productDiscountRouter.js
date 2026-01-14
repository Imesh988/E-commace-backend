const express = require('express');
const router = express.Router();


const productDiscountController = require('../controller/productDiscountController');

router.post('/create', productDiscountController.saveProductDiscount);
router.get('/all', productDiscountController.getAllProductDiscount);
router.get('/find/:productId', productDiscountController.getProductDiscountByProductId);
router.get('/find/:discountId', productDiscountController.getDiscountId);
router.get('/search/:text', productDiscountController.getProductDiscountByText);
router.put('/update/:discountId', productDiscountController.updateProductDiscount);
router.delete('/delete/:discountId', productDiscountController.deleteProductDiscount);


module.exports = router;