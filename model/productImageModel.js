const db = require('../config/database');
const { findByText, findById } = require('./categoryModel');

const productImageModel = {

    create: (data) => {
        const { image_id, status = 1, image, is_primary, product_id } = data;
        const sql = `INSERT INTO product_images
                        (image_id, status, image, is_primary,  product_id)
                        VALUES (?, ?, ?, ?, ?) `;
        return db.execute(sql, [image_id, status, image, is_primary, product_id]);
    },

    findAll: () => {
        const sql = 'SELECT * FROM product_images WHERE status = 1';
        return db.execute(sql);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT p.product_id, p.product_name,
                            pi.image_id, pi.image FROM product p
                            LEFT JOIN product_images pi 
                            ON p.product_id = pi.product_id
                            WHERE p.status = 1
                            AND p.product_name LIKE ?`;
        return db.execute(sql, [searchText])
    },

    findById: (imageId) => {
        const sql = `SELECT * FROM product_images WHERE image_id = ?`;
        return db.execute(sql, [imageId]);
    },

    update: (images, imageId) => {
        const { status, image, is_primary, product_id } = images;
        const sql = `UPDATE product_images SET status = ?, image = ?, is_primary = ?, 
                    product_id = ?  WHERE image_id = ?`;
        return db.execute(sql, [status, image, is_primary, product_id, imageId]);
    },

    delete: (imageId) => {
        const sql = `DELETE FROM product_images WHERE image_id = ?`;
        return db.execute(sql, [imageId]);
    }


}
module.exports = productImageModel;