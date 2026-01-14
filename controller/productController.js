const productModel = require('../model/productModel');
const { getAllCategory } = require('./categoryController');

const productController = {
    saveProduct: async(req, res) => {
        try {
            const productData = req.body;
            const [result] = await productModel.create(productData)

            if (result.affectedRows === 1) {
                res.status(201).json({ msg: 'Product Created Successfully' });
            } else {
                res.status(400).json({ msg: 'Product Not Created' });
            }
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }

    },

    getAllProduct: async(req, res) => {
        try {
            const [result] = await productModel.findAll();

            if (result.length === 0) {
                return res.status(404).json({ msg: `No Product Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    getProductById: async(req, res) => {
        try {
            const id = req.params.productId;
            const [result] = await productModel.findById(id);
            if (result.length === 0) {
                return res.status(404).json({ msg: `Product Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    getProductByText: async(req, res) => {
        try {
            const searchText = req.params.text;
            const [result] = await productModel.findByText(searchText);
            if (result.length == 0) {
                return res.status(404).json({ msg: `Product Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    updateProduct: async(req, res) => {
        try {
            const productData = req.body;
            const productId = req.params.productId;

            const [findProduct] = await productModel.findById(productId);
            if (findProduct.length == 0) {
                return res.status(404).json({ msg: `Product Not Found` });
            }

            const [result] = await productModel.update(productData, productId);
            if (result.affectedRows === 1) {
                return res.status(200).json({ msg: `Product Updated Successfully` });
            } else {
                return res.status(400).json({ msg: `Product Not Updated` });
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    deleteProduct: async(req, res) => {
        try {

            const productId = req.params.productId;
            const [findedProduct] = await productModel.findById(productId);
            if (findedProduct.lenght === 0) {
                return res.status(404).json({ msg: `Product Not Found` })
            }


            const [result] = await productModel.delete(productId);
            if (result.affectedRows === 1) {
                return res.status(200).json({ msg: `Product Deleted Successfully` });
            } else {
                return res.status(400).json({ msg: `Product Not Deleted` });
            }


        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    }
}

module.exports = productController;