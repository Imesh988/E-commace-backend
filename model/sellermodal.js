const db = require('../config/database');

const sellerModal = {
    create: (seller) => {
        const {
            seller_id, 
            seller_name, 
            address, 
            email, 
            mobile_no,
            status = 1, 
            super_admin_id,
            role_id 
        } = seller;

        const sql = `INSERT INTO seller (seller_id, seller_name, address, email, mobile_no, status, created_at, super_admin_id, role_id)
                     VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?)`;

        return db.execute(sql, [seller_id, seller_name, address, email, mobile_no, status, super_admin_id, role_id]);
    },

    findAll: () => {
        const sql = `
            SELECT s.*, sa.super_admin_name, r.role
            FROM seller s
            LEFT JOIN super_admin sa ON s.super_admin_id = sa.super_admin_id
            LEFT JOIN role r ON s.role_id = r.role_id
            WHERE s.status = 1
            ORDER BY s.seller_name ASC;
        `;
        return db.execute(sql);
    },

    update: (seller, sellerId) => {
        const {
            seller_name, 
            address, 
            email, 
            mobile_no,
            super_admin_id,
            role_id 
        } = seller;

        const sql = `UPDATE seller SET seller_name = ?, address = ?, email = ?, mobile_no = ?, super_admin_id = ?, role_id = ? 
                     WHERE seller_id = ?`;
        
        return db.execute(sql, [seller_name, address, email, mobile_no, super_admin_id, role_id, sellerId]);
    },

    delete: (sellerId) => {
        const sql = `UPDATE seller SET status = 0 WHERE seller_id = ?`;
        return db.execute(sql, [sellerId]);
    },

    findById: (sellerId) => {
        const sql = `SELECT * FROM seller WHERE status=1 AND seller_id = ?`;
        return db.execute(sql, [sellerId]);
    },

   findText: (input) => {
    const searchText = `%${input}%`;
    const sql = `
        SELECT s.*, sa.super_admin_name, r.role 
        FROM seller s
        LEFT JOIN super_admin sa ON s.super_admin_id = sa.super_admin_id
        LEFT JOIN role r ON s.role_id = r.role_id
        WHERE s.status = 1 AND (
            s.seller_name LIKE ? OR 
            s.address LIKE ? OR 
            s.email LIKE ? OR 
            s.mobile_no LIKE ? OR 
            sa.super_admin_name LIKE ? OR 
            r.role LIKE ?             
        )
    `;
    
    return db.execute(sql, [
        searchText,
        searchText,
        searchText,
        searchText,
        searchText,
        searchText  
    ]);
}
}

module.exports = sellerModal;