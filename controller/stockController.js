const stockModal = require('../model/stockModal');

const stockController = {
    
    stockCreate: async(req,res) => {
        try {
            const [result] = await stockModal.create(req.body);

            if(result.affectedRows === 1){
                return res.status(201).json({msg:'Stock Created Successfully!'});
            }else{
                return res.status(400).json({msg:'Stock Not Created!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getAllStock: async(req,res) => {
        try {
            const [result] = await stockModal.findAll();

            if(result.length === 0){
                return res.status(404).json({msg:'Stock Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getStockText: async(req,res) => {
        try {
            const text = req.params.text;

            const [result] = await stockModal.findByText(text);

            if(result.length === 0){
                return res.status(404).json({msg:'Stock Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    updateStock: async(req,res) => {
        try {
            const stockId = req.params.stockId;
            const stockData = req.body;

            const [result] = await stockModal.update(stockData,stockId);

            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Stock Updated Successfully!'});
            }else{
                return res.status(400).json({msg:'Stock Not Updated!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    deleteStock: async(req,res) => {
        try {
            const stockId = req.params.stockId;

            const [result] = await stockModal.delete(stockId);
            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Stock Deleted Successfully!'});
            }else{
                return res.status(400).json({msg:'Stock Not Deleted!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    }
}

module.exports = stockController;