const productImageModel = require('../model/productImageModel');
const fs = require('fs');
const path = require('path');

const productImageControlller = {
    savePrductImage: async(req, res) => {
        try {
            const { image_id, status = 1, is_primary, product_id } = req.body;
            // image path for DB
            const imagePath = `/public/products/images/${req.file.filename}`;

            const imageData = {
                image_id,
                status,
                image: imagePath,
                is_primary,
                product_id
            };

            const [result] = await productImageModel.create(imageData);

            if (result.affectedRows === 1) {
                res.status(201).json({ msg: `Image Added Successfully` });
            } else {
                res.status(400).json({ msg: `Image Not Added` });
            }
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error} ` });
        }
    },

    getAllImages: async(req, res) => {
        try {
            const [result] = await productImageModel.findAll();

            if (result.length === 0) {
                return res.status(404).json({ msg: `No Image Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error} ` });
        }
    },

    getImageByText: async(req, res) => {
        try {
            const searchText = req.params.text;
            const [result] = await productImageModel.findByText(searchText);

            if (result.length == 0) {
                return res.status(404).json({ msg: `Product Image Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error} ` });
        }
    },

    getimageId: async(req, res) => {
        try {
            const id = req.params.imageId;

            const [result] = await productImageModel.findById(id);
            if (result.length === 0) {
                return res.status(404).json({ msg: `Product Image Not Found` });
            }
            console.log(req.parms);
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error} ` });
        }
    },

    updateImge: async(req, res) => {
        try {
            const imageId = req.params.imageId;
            const { status, is_primary, product_id } = req.body;

            console.log(req.body);

            const [findImage] = await productImageModel.findById(imageId);
            if (findImage.length == 0) {
                return res.status(404).json({ msg: `Image Not Found` });
            }
            let imagePath = findImage[0].image;

            if (req.file) {
                imagePath = `/public/products/images/${req.file.filename}`;

                // delete old image file
                const oldImagePath = path.join(
                    __dirname,
                    '..',
                    findImage[0].image
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            const updateData = {
                status,
                image: imagePath,
                is_primary,
                product_id
            };

            const [result] = await productImageModel.update(updateData, imageId);
            if (result.affectedRows > 0) {
                return res.status(200).json({ msg: `Image Updated Successsfully` });
            } else {
                return res.status(400).json({ msg: `Image Not Updated` });
            }
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error} ` });
        }
    },

    deleteImage: async(req, res) => {
        try {
            const imageId = req.params.imageId;
            const [findedImage] = await productImageModel.findById(imageId);
            if (findedImage.length === 0) {
                return res.status(404).json({ msg: `Image Not Found` });
            }

            const [result] = await productImageModel.delete(imageId);
            if (result.affectedRows === 1) {
                return res.status(200).json({ msg: `Image Deleted Successfully` });
            } else {
                return res.status(400).json({ msg: `Image Not Deleted` });
            }
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error} ` });
        }
    }


}

module.exports = productImageControlller;