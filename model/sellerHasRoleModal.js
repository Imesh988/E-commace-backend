const db = require("../config/database");

const sellerHasRoleModel = {

    create: (sellerHasRole) => {
        const {id,seller_id,role_id} = sellerHasRole;
        const sql = `INSERT INTO seller_has_role (id,seller_id,role_id) VALUES (?,?,?)`;
        return db.execute(sql, [id,seller_id,role_id]);
    },

    findAll: () => {
        const sql = `SELECT id,seller_id,role_id FROM seller_has_role ORDER BY id ASC;`;
        return db.execute(sql);
    },

    findById: (sellerhasRoleId) => {
        const sql = `SELECT id,seller_id,role_id FROM seller_has_role WHERE id = ?`;
        return db.execute(sql, [sellerhasRoleId]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT id,seller_id,role_id FROM seller_has_role WHERE id LIKE ? 
        OR seller_id LIKE ? OR role_id LIKE ?`;
        return db.execute(sql, [searchText, searchText, searchText]);
    },


    update: (sellerHasRole, sellerHasRoleId) => {
        const {id,seller_id,role_id} = sellerHasRole;
        const sql = `UPDATE seller_has_role SET seller_id = ?, role_id = ? WHERE id = ?`;
        return db.execute(sql, [seller_id,role_id,sellerHasRoleId]);
    },

    delete: (sellerHasRoleId) => {
        const sql = `DELETE FROM seller_has_role WHERE id = ?`;
        return db.execute(sql, [sellerHasRoleId]);
    }
    
}

module.exports = sellerHasRoleModel;