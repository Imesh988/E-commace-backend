const db = require('../config/database');

const productDiscountModel = {
    create: (data) => {
        const { id, product_id, discount_type, discount_amount, status = 1 } = data;
        const sql = `INSERT INTO product_discount 
                        (id, product_id, discount_type, discount_amount, status, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, NOW(), NOW() )`;
        return db.execute(sql, [id, product_id, discount_type, discount_amount, status]);
    },

    findAll: () => {
        const sql = `SELECT * FROM product_discount WHERE status = 1`;
        return db.execute(sql);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM product_discount WHERE status = 1 AND (product_id LIKE ? OR discount_type LIKE ? )`;
        return db.execute(sql, [searchText, searchText]);
    },

    findByProductId: (productId) => {
        const sql = `SELECT * FROM product_discount WHERE status = 1 AND product_id = ?`;
        return db.execute(sql, [productId]);
    },

    findById: (discountId) => {
        const sql = `SELECT * FROM product_discount WHERE  id = ?`;
        return db.execute(sql, [discountId]);
    },


    update: (discount, discountId) => {
        const { product_id, discount_type, discount_amount, status } = discount;
        const sql = `UPDATE product_discount SET product_id = ?, discount_type = ?, discount_amount = ?, status = ? WHERE id = ? `;
        return db.execute(sql, [product_id, discount_type, discount_amount, status, discountId]);
    },

    delete: (discountId) => {
        const sql = `UPDATE product_discount SET status = 0 WHERE id = ? `;
        return db.execute(sql, [discountId]);
    }

}
module.exports = productDiscountModel;