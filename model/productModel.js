const db = require('../config/database');
const { findById } = require('./categoryModel');
const productModel = {
    create: (data) => {
        const { product_id, product_code, product_name, price, product_colors, status = 1, category_id } = data;
        const sql = `INSERT INTO product 
                        (product_id, product_code, product_name, price, product_colors, status, category_id, created_at, updated_at)
                            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW() )`;
        return db.execute(sql, [product_id, product_code, product_name, price, product_colors, status, category_id])
    },

    findAll: () => {
        const sql = `SELECT * FROM product WHERE status = 1 `;
        return db.execute(sql);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM product WHERE status=1 AND (product_code LIKE ? OR product_name LIKE ? OR category_id LIKE ?)`;
        return db.execute(sql, [searchText, searchText, searchText]);
    },

    findById: (productId) => {
        const sql = `SELECT * FROM product WHERE status = 1 AND product_id = ?`;
        return db.execute(sql, [productId]);
    },

    update: (products, productId) => {
        const { product_id, product_code, product_name, price, product_colors, status, category_id } = products;
        const sql = `UPDATE product SET product_code = ?, product_name = ?, price = ?,
                    product_colors = ?, status = ?, category_id = ? WHERE product_id = ? `;
        return db.execute(sql, [product_code, product_name, price, product_colors, status, category_id, productId])
    },

    delete: (productId) => {
        const sql = `UPDATE product SET status = 0 WHERE product_id = ? `;
        return db.execute(sql, [productId]);
    }
}
module.exports = productModel;