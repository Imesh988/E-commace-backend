const express = require('express');
const router = express.Router();

const supplierController = require('../controller/supplierController');

router.post('/create', supplierController.supplierCreate);
router.get('/all', supplierController.getAllSuppiler);
router.get('/search/:text', supplierController.getSupplierText);
router.put('/update/:supplierId', supplierController.updateSupplier);
router.delete('/delete/:supplierId', supplierController.deleteSupplier);

module.exports = router;