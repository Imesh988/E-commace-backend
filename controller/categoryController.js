const categoryModel = require('../model/categoryModel');
const fs = require('fs');
const path = require('path');


const categoryController = {
    saveCategory: async(req, res) => {
        try {
            const { category_id, category, description } = req.body;

            if (!req.files || !req.files.category_img_1) {
                return res.status(400).json({
                    msg: 'Primary image (category_img_1) is required'
                });
            }
            // image path for DB
            const image1Path = `/public/category/images/${req.files.category_img_1[0].filename}`;

            // category_img_2 is optional
            let image2Path = null;
            if (req.files.category_img_2) {
                image2Path = `/public/category/images/${req.files.category_img_2[0].filename}`;
            }

            const categoryData = {
                category_id,
                category,
                description,
                category_img_1: image1Path,
                category_img_2: image2Path
            }

            const [result] = await categoryModel.create(categoryData)
            console.log(req.body)

            if (result.affectedRows === 1) {
                res.status(201).json({ msg: `Category Created Successfully` });
            } else {
                res.status(400).json({ msg: 'Category Not Created' });
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` })
        }
    },

    getAllCategory: async(req, res) => {
        try {
            const [result] = await categoryModel.findAll();

            if (result.length === 0) {
                return res.status(404).json({ msg: 'No Category Found' });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    getCategoryById: async(req, res) => {
        try {
            const id = req.params.categoryID;
            console.log(req.params)
            const [result] = await categoryModel.findById(id);
            if (result.length === 0) {
                return res.status(404).json({ msg: `Category Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal server error ${error} ` });
        }
    },

    getCategoryByText: async(req, res) => {
        try {
            const searchText = req.params.text;
            console.log(req.params);
            console.log(req.searchText);
            const [result] = await categoryModel.findByText(searchText);
            if (result.length == 0) {
                return res.status(404).json({ msg: `Category Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });

        }
    },

    updateCategory: async(req, res) => {
        try {

            const categoryID = req.params.categoryID;
            const { category, description } = req.body;
            // console.log(req.params.categoryID);
            // console.log(req.body);

            const [findCategory] = await categoryModel.findById(categoryID);
            if (findCategory.length == 0) {
                return res.status(404).json({ msg: `Category Not Found` });
            }
            // old images
            let category_img_1 = findCategory[0].category_img_1;
            let category_img_2 = findCategory[0].category_img_2;

            if (req.files && req.files.category_img_1) {
                const newImg1 = `/public/category/images/${req.files.category_img_1[0].filename}`;

                // delete old image 1
                if (category_img_1) {
                    const oldPath1 = path.join(__dirname, '..', category_img_1);
                    if (fs.existsSync(oldPath1)) fs.unlinkSync(oldPath1);
                }

                category_img_1 = newImg1;
            }

            if (req.files && req.files.category_img_2) {
                const newImg2 = `/public/category/images/${req.files.category_img_2[0].filename}`;

                // delete old image 2 (if exists)
                if (category_img_2) {
                    const oldPath2 = path.join(__dirname, '..', category_img_2);
                    if (fs.existsSync(oldPath2)) fs.unlinkSync(oldPath2);
                }

                category_img_2 = newImg2;
            }

            if (req.files && req.files.category_img_2) {
                const newImg2 = `/public/category/images/${req.files.category_img_2[0].filename}`;

                // delete old image 2 (if exists)
                if (category_img_2) {
                    const oldPath2 = path.join(__dirname, '..', category_img_2);
                    if (fs.existsSync(oldPath2)) fs.unlinkSync(oldPath2);
                }

                category_img_2 = newImg2;
            }

            const updateData = {
                category,
                description,
                category_img_1,
                category_img_2
            };

            const [result] = await categoryModel.update(updateData, categoryID);
            if (result.affectedRows == 1) {
                return res.status(200).json({ msg: 'Category Updated Successfully' })
            } else {
                return res.status(400).json({ msg: 'Category Not Updated' })
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    deleteCategory: async(req, res) => {
        try {
            const categoryID = req.params.categoryID;
            const [findedCategory] = await categoryModel.findById(categoryID);
            if (findedCategory.length === 0) {
                return res.status(404).json({ msg: 'Category Not Found' });
            }

            const [result] = await categoryModel.delete(categoryID);
            if (result.affectedRows === 1) {
                return res.status(200).json({ msg: 'Category Deleted Successfully' });
            } else {
                return res.status(400).json({ msg: 'Category Not Deleted' });
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });

        }
    }
}

module.exports = categoryController;