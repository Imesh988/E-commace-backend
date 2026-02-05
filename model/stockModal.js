const db = require("../config/database");
// const { findByText } = require("./superAdminModal");

const stockModal = {

    create: (stock) => {
        const { seller_id, grn_id, qty, status = 1 } = stock;
        const sql = `INSERT INTO stock (seller_id ,grn_id ,qty ,status ,created_at,updated_at )
         VALUES (?,?,?,?,NOW(),NOW());`;
        return db.execute(sql, [seller_id, grn_id, qty, status]);
    },

    findAll: () => {
        const sql = `SELECT 
            stock.id, 
            stock.seller_id, 
            seller.seller_name, 
            stock.grn_id, 
            stock.qty 
        FROM stock 
        INNER JOIN seller ON stock.seller_id = seller.seller_id 
        WHERE stock.status = 1
        ORDER BY stock.qty ASC`;
        return db.execute(sql);
    },


   findByText: (text) => {
    const searchText = `%${text}%`;
    const sql = `
        SELECT 
            stock.id, 
            stock.seller_id, 
            seller.seller_name, 
            stock.grn_id, 
            stock.qty 
        FROM stock 
        INNER JOIN seller ON stock.seller_id = seller.seller_id 
        WHERE stock.status = 1 
        AND (
            seller.seller_name LIKE ? OR 
            stock.grn_id LIKE ? OR 
            stock.qty LIKE ? OR
            stock.seller_id LIKE ?
        )
        ORDER BY stock.qty ASC
    `;
    
    return db.execute(sql, [searchText, searchText, searchText, searchText]);
},

    update: (stock, stockId) => {
        const { seller_id, grn_id, qty } = stock;
        const sql = `UPDATE stock SET seller_id=?, grn_id=?, qty=? WHERE id=?`;
        return db.execute(sql, [seller_id, grn_id, qty, stockId]);
    },

    delete: (stockId) => {
        const sql = `UPDATE stock SET status = 0 WHERE id = ?`;
        return db.execute(sql, [stockId]);
    },
}


module.exports = stockModal;