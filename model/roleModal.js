const db = require('../config/database');

const roleModel = {
    create: (Nrole) => {
        const {role,description} = Nrole;
        const sql = `INSERT INTO role (role ,description ,created_at )
                    VALUES (?,?,NOW());`;
        return db.query(sql, [role, description]);
    },

    findAll: () => {
            const sql = `SELECT role_id, role, description 
                        FROM role 
                        ORDER BY role ASC;`;
        return db.execute(sql);             
    },

    update: (roles ,roleId) => {
        const {role , description} = roles;
        const sql = `UPDATE role SET role=?, description=? WHERE role_id=?`;
        return db.execute(sql, [role, description, roleId]);
    },

    delete: (roleId) => {
        const sql = `DELETE FROM role WHERE role_id=?`;
        return db.execute(sql, [roleId]);
    },

    findBytext: (input) => {
            const searchText = `%${input}%`;
            const sql = `SELECT * FROM role WHERE role LIKE ? OR description LIKE ?`;
    
            return db.execute(sql, [searchText, searchText]);
    
        },

};

module.exports = roleModel;