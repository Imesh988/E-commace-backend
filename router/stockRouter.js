const express = require('express');
const router = express.Router();

const stockController = require('../controller/stockController');

router.post('/create', stockController.stockCreate);
router.get('/all', stockController.getAllStock);
router.get('/text/:text', stockController.getStockText);
router.put('/update/:stockId', stockController.updateStock);
router.delete('/delete/:stockId', stockController.deleteStock);


module.exports = router;
