const sellerModal = require("../model/sellermodal");

const sellerController = {
     sellerCreate: async (req, res) => {
        try {
            const [result] = await sellerModal.create(req.body);
            if (result.affectedRows === 1) {
                return res.status(201).json({ msg: 'Seller Created Successfully!' });
            } else {
                return res.status(400).json({ msg: 'Seller Not Created!' });
            }
        } catch (error) {
            console.log(error);

            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('email')) {
                    return res.status(400).json({ msg: 'Email already exists!' });
                }
                if (error.sqlMessage.includes('PRIMARY') || error.sqlMessage.includes('seller_id')) {
                    return res.status(400).json({ msg: 'Seller ID already exists!' });
                }
                return res.status(400).json({ msg: 'Duplicate entry detected!' });
            }

            return res.status(500).json({ msg: 'Internal Server Error!' });
        }
    },


    getAllSeller: async(req,res) => {
        try {
            const [result] = await sellerModal.findAll();
            if(result.length === 0){
                return res.status(404).json({msg:'Seller Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal sever  error !!'});
            
            
        }
    },

    sellerUpdate: async (req,res) => {
        try {
            const sellerId = req.params.sellerId;
            const sellerData = req.body;
            const [result] = await sellerModal.update(sellerData,sellerId);
            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Seller Updated Successfully!'});
            }else{
                return res.status(400).json({msg:'Seller Not Updated!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    sellerDelete: async (req,res) => {
        try {
            const sellerId = req.params.sellerId;
            const [result] = await sellerModal.delete(sellerId);
            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Seller Update Successfully !!'});
            }else{
                return res.status(400).json({msg:'Seller Not Delete !!'});
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({msg:'Internal server error !!'});
            
            
        }
    },

    getSellerId: async(req,res) => {
        try {
            const id = req.params.sellerId;
            const [result] = await sellerModal.findById(id);

            if(result.length === 0){
                return res.status(404).json({msg:'Seller Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getSellertext: async(req,res) => {
        try {
            const text = req.params.text;
            const [result] = await sellerModal.findText(text);

            if(result.length === 0){
                return res.status(404).json({msg:'Seller Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    }
    
}

module.exports = sellerController;