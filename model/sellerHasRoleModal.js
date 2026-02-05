const db = require("../config/database");

const sellerHasRoleModel = {

    create: (sellerHasRole) => {
        const { id, seller_id, role_id } = sellerHasRole;
        const sql = `INSERT INTO seller_has_role (id,seller_id,role_id) VALUES (?,?,?)`;
        return db.execute(sql, [id, seller_id, role_id]);
    },

    // sellerHasRoleModal.js

    findAll: () => {
        const sql = `
        SELECT 
            shr.id, 
            shr.seller_id, 
            shr.role_id, 
            s.seller_name, 
            r.role AS role 
        FROM seller_has_role shr
        INNER JOIN seller s ON shr.seller_id = s.seller_id
        INNER JOIN role r ON shr.role_id = r.role_id
        ORDER BY shr.id ASC;
    `;
        return db.execute(sql);
    },

    findById: (sellerhasRoleId) => {
        const sql = `SELECT id,seller_id,role_id FROM seller_has_role WHERE id = ?`;
        return db.execute(sql, [sellerhasRoleId]);
    },


    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `
        SELECT 
            shr.id, 
            shr.seller_id, 
            shr.role_id, 
            s.seller_name, 
            r.role AS role 
        FROM seller_has_role shr
        INNER JOIN seller s ON shr.seller_id = s.seller_id
        INNER JOIN role r ON shr.role_id = r.role_id
        WHERE shr.id LIKE ? 
           OR s.seller_name LIKE ? 
           OR r.role LIKE ? 
           OR shr.seller_id LIKE ?
        ORDER BY shr.id ASC;
    `;

        return db.execute(sql, [searchText, searchText, searchText, searchText]);
    },


    update: (sellerHasRole, sellerHasRoleId) => {
        const { id, seller_id, role_id } = sellerHasRole;
        const sql = `UPDATE seller_has_role SET seller_id = ?, role_id = ? WHERE id = ?`;
        return db.execute(sql, [seller_id, role_id, sellerHasRoleId]);
    },

    delete: (sellerHasRoleId) => {
        const sql = `DELETE FROM seller_has_role WHERE id = ?`;
        return db.execute(sql, [sellerHasRoleId]);
    }

}

module.exports = sellerHasRoleModel;