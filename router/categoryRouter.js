const express = require('express');
const router = express.Router();
const upload = require('../middleware/categoryUpload');

const categoryController = require('../controller/categoryController');

router.post('/create', upload.fields([
    { name: 'category_img_1', maxCount: 1 }, // required
    { name: 'category_img_2', maxCount: 1 } // optional
]), categoryController.saveCategory);
router.get('/all', categoryController.getAllCategory);
router.get('/find/:categoryID', categoryController.getCategoryById);
router.get('/search/:text', categoryController.getCategoryByText);
router.put('/update/:categoryID', upload.fields([
    { name: 'category_img_1', maxCount: 1 }, // required
    { name: 'category_img_2', maxCount: 1 } // optional
]), categoryController.updateCategory);
router.put('/delete/:categoryID', categoryController.deleteCategory);


module.exports = router;