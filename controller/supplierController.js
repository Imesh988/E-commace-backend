const supplierModel = require('../model/supplierModel');

const supplierController = {
    supplierCreate: async (req,res) => {
        try {
            const [result] = await supplierModel.create(req.body);

            if(result.affectedRows === 1){
                return res.status(201).json({msg:'Supplier Created Successfully!'});
            }else{
                return res.status(400).json({msg:'Supplier Not Created!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getAllSuppiler: async(req,res) => {
        try {
            const [result] = await supplierModel.findAl();
            if(result.length === 0){
                return res.status(200).json({msg:'Supplier Not Found!'});
            }
            return res.status(200).json({data:result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getSupplierText: async(req,res) => {
        try {
            const text = req.params.text;
            const [result] = await supplierModel.findBytext(text);
            // console.log(result);
            
           if(result.length === 0){
                return res.status(404).json({mes:'Usernot Found !!'});
            }
            res.status(200).json({data:result});

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    updateSupplier: async(req,res) => {
        try {
            const supplierData = req.body;
            const supplierId = req.params.supplierId;

            const [result] = await supplierModel.update(supplierData,supplierId);

            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Supplier update Successfuly !!'});
            }else{
                return res.status(400).json({msg:'Supplier Not Updated !!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error !!'});
        }
    },

    deleteSupplier: async(req,res) => {
        try {
            const supplierId = req.params.supplierId;

            const [resut] = await supplierModel.delete(supplierId);
            if(resut.affectedRows === 1){
                return res.status(200).json({msg:'Supplier Deleted Successfully !!'});
            }else{
                return res.status(400).json({msg:'Supplier Not Deleted !!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error !!'});
        }
    }


}

module.exports = supplierController;