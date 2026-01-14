const db = require("../config/database");
// const { findByText } = require("./superAdminModal");

const stockModal = {
    
    create: (stock) => {
        const {seller_id,grn_id,qty,status=1} = stock;
        const sql = `INSERT INTO stock (seller_id ,grn_id ,qty ,status ,created_at,updated_at )
         VALUES (?,?,?,?,NOW(),NOW());`;
        return db.execute(sql,[seller_id,grn_id,qty,status]);
    },

    findAll: () => {
        const sql = `SELECT seller_id,grn_id,qty FROM stock ORDER BY 
                    qty ASC`;
        return db.execute(sql);
    },


    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM stock WHERE status=1 AND 
                    (seller_id LIKE ? OR grn_id LIKE ? OR qty LIKE ?)`;
        return db.execute(sql, [searchText, searchText, searchText]);
    },

    update: (stock, stockId) => {
        const {seller_id,grn_id,qty} = stock;
        const sql = `UPDATE stock SET seller_id=?, grn_id=?, qty=? WHERE id=?`;
        return db.execute(sql, [seller_id, grn_id, qty, stockId]);
    },

    delete: (stockId) => {
        const sql = `UPDATE stock SET status = 0 WHERE id = ?`;
        return db.execute(sql, [stockId]);
    },
}


module.exports = stockModal;