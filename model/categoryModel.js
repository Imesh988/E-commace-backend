const db = require('../config/database');
const categoryModel = {
    create: (data) => {
        const { category_id, category, description, category_img_1, category_img_2 } = data
        const sql = `INSERT INTO category
                        (category_id, category, description, category_img_1, category_img_2 , created_at)
                        VALUES (?, ?, ?, ?, ?, NOW() )`;
        return db.execute(sql, [category_id, category, description, category_img_1, category_img_2]);
    },

    findAll: () => {
        const sql = `SELECT * FROM category`;
        return db.execute(sql);
    },

    findById: (categoryId) => {
        const sql = `SELECT * FROM category WHERE category_id=? `
        return db.execute(sql, [categoryId]);
    },

    findByText: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM category WHERE category LIKE ? `;
        return db.execute(sql, [searchText]);
    },

    update: (categories, categoryId) => {
        const { category, description, category_img_1, category_img_2 } = categories;
        const sql = `UPDATE category SET category=? , description=?, category_img_1=?, category_img_2=? WHERE category_id=?  `;
        return db.execute(sql, [category, description, category_img_1, category_img_2, categoryId])
    },

    delete: (categoryId) => {
        const sql = 'DELETE FROM category WHERE category_id=? ';
        return db.execute(sql, [categoryId]);
    }
}

module.exports = categoryModel;