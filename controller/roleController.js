const roleModel = require("../model/roleModal");

const roleController = {
    create: async (req, res) => {
        try {
            const [result] = await roleModel.create(req.body);
            if(result.affectedRows === 1){
                return res.status(201).json({ message: "Role created successfully" });
            } else {
                return res.status(400).json({ message: "Failed to create role" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    

    getAllRole: async (req,res) => {
        try {
            const [result] = await roleModel.findAll();
            if(result === 0){
                return res.status(404).json({msg: 'Role Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    roleUpdate: async(req, res) => {
        
        try {
            const roleId = req.params.roleId;
            const roleData = req.body;
            
            const [result] = await roleModel.update(roleData, roleId);
            if(result.affectedRows === 1){
                return res.status(200).json({ message: "Role updated successfully" });
            } else {
                return res.status(400).json({ message: "Failed to update role" });
            }
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    },

    roleDelete: async(req, res) => {
        try {
            const roleId = req.params.roleId;
            const [result] = await roleModel.delete(roleId);

            if(result.affectedRows === 1){
                return res.status(200).json({ message: "Role deleted successfully" });
            } else {
                return res.status(400).json({ message: "Failed to delete role" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getRoleText: async(req,res) => {
        try {
            const searchText = req.params.text;
            const [result] = await roleModel.findBytext(searchText);

            if(result.length === 0){
                return res.status(404).json({msg: 'Role Not Found !!'});
            }
            res.status(200).json({data: result});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

};

module.exports = roleController;