const superAdminModal = require("../model/superAdminModal");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const superAminController = {
    superAdminCreate: async(req,res) => {
        try {
            const {password, ...otherData} = req.body;

            if(!password){
                return res.status(400).json({msg:'Password is required'})
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const superAdminData = {
                ...otherData,
                password: hashedPassword
            }

            const [result] = await superAdminModal.create(superAdminData);
            if(result.affectedRows === 1){
                return res.status(201).json({msg:'Super Admin Created Successfully!'});
            }else{
                return res.status(400).json({msg:'Super Admin Not Created!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    getAllSuperAdmin: async(req,res) => {
        try {
            const [result] = await superAdminModal.findAll();
            if(result.length === 0){
                return res.status(404).json({msg:'Super Admin Not Found !!'});

            }
            res.status(200).json({data:result});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Internal Server Error !!'});
            
            
        }
    },

    getSuperAdminText: async(req, res) => {
        try {
            const searchText = req.params.text;
            const [result] = await superAdminModal.findByText(searchText);
            if(result.length === 0){
                return res.status(404).json({msg:'Super Admin Not Found !!'})
            }
            res.status(200).json({data:result})
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Internal Server Error !!'});
        }
    },

    superAdminUpdate: async(req,res) => {
        try {
            const superAdminData = req.body;
            const superAdminId = req.params.superAdminId;
            const [result] = await superAdminModal.update(superAdminData,superAdminId);
            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Super Admin Updated Successfully!'});
            }else{
                return res.status(400).json({msg:'Super Admin Not Updated!'});
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    superAdminDelete: async(req,res) => {
        try {
            const superAdminId = req.params.superAdminId;
            const [result] = await superAdminModal.delete(superAdminId);

            if(result.affectedRows === 1){
                return res.status(200).json({msg:'Super Admin Deleted Successfully!'});
            }else{
                return res.status(400).json({msg:'Super Admin Not Deleted!'});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
        }
    },

    superAdminLogin: async(req,res) => {
        try {
            const {user_name, password} = req.body;
            // console.log(user_name,password);
            
            const [selectSuperAdmin] = await superAdminModal.findByUsername(user_name);
            if(selectSuperAdmin.length === 0){
                return res.status(404).json({msg:'Super Admin Not Found !!'})
            }

            const isMatch = await bcrypt.compare(password, selectSuperAdmin[0].password);
            if(!isMatch){
                return res.status(401).json({msg:'Invalid Password !!'})
            }


            const superAdmin = selectSuperAdmin[0];
            const token = jwt.sign({
                id: superAdmin.id,
                username: superAdmin.username
            }, process.env.JWT_SECRET, { expiresIn: '2h' })
            res.status(200).json({token, username: superAdmin.username})
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Internal Server Error!'});
            
            
        }
    }
}


module.exports = superAminController;
