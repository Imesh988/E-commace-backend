const sellerHasRoleModel = require("../model/sellerHasRoleModal");

const sellerHasRoleController = {
    sellerHasRoleCreate: async (req,res) => {
        try {
            const [result] = await sellerHasRoleModel.create(req.body);

            if(result.affectedRows === 1){
                return res.status(201).json({msg:'Seller Has Role Created Successfully!'});
            }else{
                return res.status(400).json({msg:'Seller Has Role Not Created!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getAllSellerhasRole: async (req,res) => {
        try {
            const [result] = await sellerHasRoleModel.findAll();

            if(result.length === 0){
                return res.status(404).json({msg: 'Seller Has Role Not Found !!'});
            }

            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error !!'});
            
        }
    },

    getSellerHasRoleId: async (req,res) => {
        try {
            const sellerHasRoleId = req.params.sellerHasRoleId;
            const [result] = await sellerHasRoleModel.findById(sellerHasRoleId);

            if(result.length === 0){
                return res.status(404).json({msg: 'Seller Has Role Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error !!'});
        }
    },

    getSellerHasRoleText: async(req,res) => {
        try {
            const text = req.params.text;
            const [result] = await sellerHasRoleModel.findByText(text);

            if(result.length === 0){
                return res.status(404).json({msg: 'Seller Has Role Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error !!'});
        }
    },

    sellerHasRoleUpdate: async(req,res) => {
        try {
            const sellerHasRoleId = req.params.sellerHasRoleId;
            const sellerHasRole = req.body;
            const [result] = await sellerHasRoleModel.update(sellerHasRole, sellerHasRoleId);

            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Seller Has Role Updated Successfully!'});
            }else{
                return res.status(400).json({msg:'Seller Has Role Not Updated!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },
    
    sellerHasRoleDelete: async(req,res) => {
        try {
            const sellerHasRoleId = req.params.sellerHasRoleId;
            const [result] = await sellerHasRoleModel.delete(sellerHasRoleId);

            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Seller Has Role Deleted Successfully!'});
            }else{
                return res.status(400).json({msg:'Seller Has Role Not Deleted!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    }
}



module.exports = sellerHasRoleController;



