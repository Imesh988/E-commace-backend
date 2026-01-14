const grnModal = require("../model/grnModal");

const grnController = {
    
    grnCreate: async(req,res) => {
        try {
            const [result] = await grnModal.create(req.body);
            // console.log(req.body);
            
            console.log(result);
            
            if(result.affectedRows === 1){
                return res.status(201).json({msg:'GRN Create Sucessfully !!'});
            }else{
                return res.status(400).json({msg: 'Failed to create GRN'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Internal Server Error '});
            
            
        }
    },

    getAllGrn: async(req,res) => {
        try {
            const [result] = await grnModal.findAll();
            if(result.length === 0){
                return res.status(404).json({msg: 'GRN not dound !!'});
            }
            return res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Internal Server Error '});
        }
    },

    getGrnText: async(req,res) => {
        try {
            const text = req.params.text;
            const [result] = await grnModal.findByText(text);
            if(result.length === 0){
                return res.status(404).json({msg: 'GRN not found !!'});
            }
            return res.status(200).json({data: result});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Internal Server Error '});
        }
    },

    grnUpdate: async(req,res) => {
        try {
            const grnId = req.params.grnId;
            const grnData = req.body;
            
            const [result] = await grnModal.update(grnData,grnId);
            
            if(result.affectedRows === 1){
                return res.status(200).json({msg:'GRN Update Sucessfully !!'});
            }else{
                return res.status(400).json({msg:'GRN Not Update !!'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Internal Server Error '});
        }
    },

    grnDelete: async(req,res) => {
        try {
            const grnId = req.params.grnId;
            const [result] = await grnModal.delete(grnId);
            
            if(result.affectedRows === 1){
                return res.status(200).json({msg:'GRN Delete Sucessfully !!'});
            }else{
                return res.status(400).json({msg:'GRN Not Delete !!'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Internal Server Error '});
        }
    }



}

module.exports = grnController;