const express = require('express');
const router = express.Router();
const upload = require('../middleware/productUpload');


const productImageControlller = require('../controller/productImageController');

router.post('/create', upload.single('image'), productImageControlller.savePrductImage);
router.get('/all', productImageControlller.getAllImages);
router.get('/find/:imageId', productImageControlller.getimageId);
router.get('/search/:text', productImageControlller.getImageByText);
router.put('/update/:imageId', upload.single('image'), productImageControlller.updateImge);
router.delete('/delete/:imageId', productImageControlller.deleteImage);


module.exports = router;