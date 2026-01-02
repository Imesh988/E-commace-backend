const db = require('../config/database');

const sellerModal = {
    create: (seller) => {
        const {seller_id,seller_name,address,email,mobile_no,
            status=1,super_admin_id
        } = seller;

        const sql = `INSERT INTO seller (seller_id ,seller_name ,address,email ,mobile_no ,status ,created_at ,super_admin_id )
         VALUES (?,?,?,?,?,?,NOW(),?)`;

     return db.execute(sql,[seller_id,seller_name,address,email,mobile_no,status,super_admin_id]);


    },

    findAll: () => {
        const sql = `SELECT seller_id, seller_name, address, email, mobile_no, super_admin_id 
                     FROM seller 
                     ORDER BY seller_name ASC;`
        return db.execute(sql);
    },

    update: (seller , sellerId) => {
        const {seller_id,seller_name,address,email,mobile_no,
           super_admin_id
        } = seller;

        const sql = `UPDATE seller SET seller_name = ?, address = ?, email = ?, mobile_no = ?, super_admin_id = ? WHERE seller_id = ?`;
        return db.execute(sql,[seller_name,address,email,mobile_no,super_admin_id,sellerId]);
    },

    delete: (sellerId) => {
        const sql = `UPDATE seller SET status = 0 WHERE seller_id = ?`;
        return db.execute(sql,[sellerId]);
    },

    findById: (sellerId) => {
        const sql = `SELECT * FROM seller WHERE status=1 AND seller_id = ?`;
        return db.execute(sql, [sellerId]);
    },

    findText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM seller WHERE status=1 AND (seller_name LIKE ? OR address LIKE ? OR email LIKE ? OR mobile_no LIKE ? OR super_admin_id LIKE ?)`;
        return db.execute(sql, [searchText, searchText, searchText, searchText, searchText]);
    }
    
}

module.exports = sellerModal;