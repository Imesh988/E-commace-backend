const db = require('../config/database');
const { findAll } = require('./roleModal');

const superAdminModal = {
    create: (superAdmin) => {
        const {user_name = null,
            password = null,
            status = 1,
            super_admin_name = null,
            email = null} 
            = superAdmin;
        const sql = `INSERT INTO super_admin (user_name ,password ,status ,super_admin_name ,email )
        VALUES (?,?,?,?,?)`
        return db.execute(sql,[user_name,password,status,super_admin_name,email]);

    },

    findAll: () => {
        const sql = `SELECT user_name,super_admin_name,email FROM super_admin ORDER BY 
                    super_admin.user_name ASC ;`;
        return db.execute(sql) ;           
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM super_admin WHERE status=1 AND 
                    user_name LIKE ? OR super_admin_name LIKE ? OR  email LIKE ?`;
        return db.execute(sql, [searchText, searchText, searchText]);
    },

    update: (superAdmin, superAdminId) => {
        const {user_name ,
            password ,
            super_admin_name ,
            email} 
            = superAdmin;
            const sql = `UPDATE super_admin SET user_name=?, password=?, super_admin_name=?, email=? WHERE super_admin_id=?`;
            return db.execute(sql, [user_name, password, super_admin_name, email, superAdminId]);
    },

    delete: (superAdminId) => {
        const sql = `UPDATE super_admin SET status = 0 WHERE super_admin_id = ?`;
        return db.execute(sql, [superAdminId]);
    },

    findByUsername: (username) => {
        const sql = `SELECT * FROM super_admin WHERE user_name = ? AND status = 1`;
        return db.execute(sql, [username]);
    }
    
}



module.exports = superAdminModal;
