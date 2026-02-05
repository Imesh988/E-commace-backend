const db = require("../config/database");

const grnModal = {
    create: (grn) => {
        const { supplier_id, product_id, date, qty, cost_price, sell_price, total } = grn;
        const sql = `INSERT INTO grn (supplier_id ,product_id , date , qty , cost_price , sell_price ,
                     total ,created_at ,updated_at ) VALUES (?,?,?,?,?,?,?,NOW(),NOW());`;
        return db.execute(sql, [supplier_id, product_id, date, qty, cost_price, sell_price, total]);
    },

    findAll: () => {
        const sql = `
        SELECT 
            grn.id, 
            grn.supplier_id, 
            supplier.supplier_name, 
            grn.product_id, 
            product.product_name, 
            grn.date, 
            grn.qty, 
            grn.cost_price, 
            grn.sell_price, 
            grn.total 
        FROM grn 
        LEFT JOIN supplier ON grn.supplier_id = supplier.supplier_id 
        LEFT JOIN product ON grn.product_id = product.product_id 
        ORDER BY grn.date ASC
    `;
        return db.execute(sql);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `
            SELECT 
                grn.id, 
                grn.supplier_id, 
                supplier.supplier_name, 
                grn.product_id, 
                product.product_name, 
                grn.date, 
                grn.qty, 
                grn.cost_price, 
                grn.sell_price, 
                grn.total 
            FROM grn 
            LEFT JOIN supplier ON grn.supplier_id = supplier.supplier_id 
            LEFT JOIN product ON grn.product_id = product.product_id 
            WHERE supplier.supplier_name LIKE ? 
            OR product.product_name LIKE ? 
            OR grn.date LIKE ? 
            OR grn.qty LIKE ? 
            OR grn.cost_price LIKE ? 
            OR grn.sell_price LIKE ? 
            OR grn.total LIKE ?
            ORDER BY grn.date ASC`;
            
        return db.execute(sql, [
            searchText, searchText, searchText, searchText, searchText, searchText, searchText
        ]);
    },

    update: (grn, grnId) => {
        const { supplier_id, product_id, date, qty, cost_price, sell_price, total } = grn;
        const sql = `UPDATE grn SET supplier_id = ?, 
        product_id = ?, date = ?, qty = ?, cost_price = ?, 
        sell_price = ?, total = ? WHERE id = ?`;
        return db.execute(sql, [supplier_id, product_id, date, qty, cost_price, sell_price, total, grnId]);
    },

    delete: (grnId) => {
        const sql = `DELETE FROM grn WHERE id = ?`;
        return db.execute(sql, [grnId]);
    }
}

module.exports = grnModal;