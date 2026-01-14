const productDiscountModel = require('../model/productDiscountModel');

const productDiscountController = {
    saveProductDiscount: async(req, res) => {
        try {
            const discountData = req.body;
            const [result] = await productDiscountModel.create(discountData)

            if (result.affectedRows === 1) {
                res.status(201).json({ msg: `Product Discount Created Successfully` });
            } else {
                res.status(400).json({ msg: 'Product Discount Not Created' });
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` })
        }
    },

    getAllProductDiscount: async(req, res) => {
        try {
            const [result] = await productDiscountModel.findAll();

            if (result.length === 0) {
                return res.status(404).json({ msg: 'No Product Discount Found' });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    getProductDiscountByProductId: async(req, res) => {
        try {
            const id = req.params.productId;

            const [result] = await productDiscountModel.findByProductId(id);
            if (result.length === 0) {
                return res.status(404).json({ msg: `Product Discount Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal server error ${error} ` });
        }
    },

    getDiscountId: async(req, res) => {
        try {
            const id = req.params.discountId;

            const [result] = await productDiscountModel.findById(id);
            if (result.length === 0) {
                return res.status(404).json({ msg: ` Discount Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal server error ${error} ` });
        }
    },

    getProductDiscountByText: async(req, res) => {
        try {
            const searchText = req.params.text;

            const [result] = await productDiscountModel.findByText(searchText);
            if (result.length == 0) {
                return res.status(404).json({ msg: `Product Discount Not Found` });
            }
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });

        }
    },

    updateProductDiscount: async(req, res) => {
        try {
            const discountData = req.body;
            const discountId = req.params.discountId;
            console.log(req.body);
            console.log(req.params);
            console.log(discountId);

            const [findProductDiscount] = await productDiscountModel.findById(discountId);
            if (findProductDiscount.length == 0) {
                return res.status(404).json({ msg: `Product Discount Not Found` });
            }

            const [result] = await productDiscountModel.update(discountData, discountId);
            if (result.affectedRows === 1) {
                return res.status(200).json({ msg: 'Product Discount Updated Successfully' })
            } else {
                return res.status(400).json({ msg: 'Product Discount Not Updated' })
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });
        }
    },

    deleteProductDiscount: async(req, res) => {
        try {
            const discountId = req.params.discountId;
            const [findedProductDiscount] = await productDiscountModel.findById(discountId);
            if (findedProductDiscount.length === 0) {
                return res.status(404).json({ msg: 'Product Discount Not Found' });
            }

            const [result] = await productDiscountModel.delete(discountId);
            if (result.affectedRows === 1) {
                return res.status(200).json({ msg: 'Product Discount Deleted Successfully' });
            } else {
                return res.status(400).json({ msg: 'Product Discount Not Deleted' });
            }

        } catch (error) {
            res.status(500).json({ msg: `Internal Server Error ${error}` });

        }
    }
}

module.exports = productDiscountController;