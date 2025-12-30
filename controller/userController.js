const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs');

const userController = {
saveUser: async (req, res) => {
    try {
        const { password, ...otherData } = req.body;

        if (!password) {
            return res.status(400).json({ msg: 'Password is required!' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const userData = {
            ...otherData,
            password: hashedPassword
        };

        console.log("Saving User Data:", userData); 

        const [result] = await userModel.create(userData);

        if (result.affectedRows === 1) {
            return res.status(201).json({ msg: 'User Registered Successfully!' });
        } else {
            return res.status(400).json({ msg: 'Registration Failed!' });
        }

    } catch (error) {
        console.error("Full Error:", error); 
        return res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
},

    getAllUser: async(req,res) => {
        try {
            const [result] = await userModel.findAll();
            if(result.length === 0){
                return res.status(404).json({mes:'Usernot Found !!'});
            }
            res.status(200).json({data:result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({mes:'Internal Sever Error !!'});
        }
    },

    getUserText: async(req,res) => {
        try {
            const searchText = req.params.text;
            const [result] = await userModel.findBytext(searchText);
            if(result.length === 0){
                return res.status(404).json({mes:'Usernot Found !!'});
            }
            res.status(200).json({data:result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({mes:'Internal Sever Error !!'});
        }
    },

    getUserById: async(req,res) => {
        try {
            const id = req.params.userId;
            const [result] = await userModel.findById(id);
            if(result.length === 0){
                return res.status(404).json({mes:'Usernot Found !!'});
            }
            res.status(200).json({data:result});
        } catch (error) {
            console.log(error);
            return res.status(500).json({mes:'Internal Sever Error !!'});
        }
    },

    updateUser: async(req,res) => {
        try {
            const userData = req.body;
            const userId = req.params.userId;
            const [finduser] = await userModel.findById(userId);
            if(finduser.length === 0){
                return res.status(404).json({mes:'Usernot Found !!'});
            }

            const [result] = await userModel.update(userData,userId);
            if(result.affectedRows === 1){
                return res.status(200).json({mes:'User Updated !!'});
            }else{
                return res.status(400).json({mes:'User Not Updated !!'});
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({mes:'User Not Updated !!'});
        }
    },

    userDelete: async(req,res) => {
        try {
            const userId = req.params.userId;
            const [findUser] = await userModel.findById(userId);
            if(findUser.length === 0){
                return res.status(404).json({mes:'Usernot Found !!'});
            }
            const [result] = await userModel.delete(userId);
            if(result.affectedRows === 1){
                return res.status(200).json({mes:'User Deleted !!'});
            }else{
                return res.status(400).json({mes:'User Not Deleted !!'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({mes:'User Not Deleted !!'});
        }
    }
}



module.exports = userController;