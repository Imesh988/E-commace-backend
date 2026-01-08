const db = require("../config/database");
const { findByText } = require("./superAdminModal");

const grnModal = {
    create: (grn) => {
        const {supplier_id,product_id,date,qty,cost_price,sell_price,total} =grn;
        const sql = `INSERT INTO grn (supplier_id ,product_id , date , qty , cost_price , sell_price ,
                     total ,created_at ,updated_at ) VALUES (?,?,?,?,?,?,?,NOW(),NOW());`;
        return db.execute(sql ,[supplier_id,product_id,date,qty,cost_price,sell_price,total]);             
    },

    findAll: () => {
        const sql = `SELECT supplier_id, product_id, date, qty, cost_price, sell_price, total 
                     FROM grn 
                     ORDER BY date ASC;`
        return db.execute(sql);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT supplier_id, product_id, date, qty, cost_price, sell_price, total 
                 FROM grn 
                 WHERE supplier_id LIKE ? 
                 OR product_id LIKE ? 
                 OR date LIKE ? 
                 OR qty LIKE ? 
                 OR cost_price LIKE ? 
                 OR sell_price LIKE ? 
                 OR total LIKE ?`;
        return db.execute(sql, [searchText, searchText, searchText, searchText, searchText, searchText, searchText]);
    },

    update: (grn,grnId) => {
        const {supplier_id,product_id,date,qty,cost_price,sell_price,total} =grn;
        const sql = `UPDATE grn SET supplier_id = ?, 
        product_id = ?, date = ?, qty = ?, cost_price = ?, 
        sell_price = ?, total = ? WHERE id = ?`;
        return db.execute(sql,[supplier_id,product_id,date,qty,cost_price,sell_price,total,grnId]);
    },

    delete: (grnId) => {
        const sql = `DELETE FROM grn WHERE id = ?`;
        return db.execute(sql,[grnId]);
    }
    
}

module.exports = grnModal;

