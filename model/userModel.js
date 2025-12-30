const db = require('../config/database');


const userModel = {

create: (user) => {
    const { 
        first_name = null, 
        last_name = null, 
        country = null, 
        disctric = null, 
        city = null, 
        addree_line1 = null,
        address_line2 = null, 
        postal_code = null, 
        mobile_no_1 = null, 
        mobile_no_2 = null,
        email = null, 
        password = null, 
        satus = 1 
    } = user;

    const sql = `INSERT INTO user (first_name, last_name, country, disctric,
                 city, addree_line1, address_line2, postal_code, mobile_no_1,
                 mobile_no_2, email, password, satus, created_at, updated_at) 
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?, NOW(), NOW());`;

    return db.execute(sql, [
        first_name, last_name, country, disctric, city, addree_line1,
        address_line2, postal_code, mobile_no_1, mobile_no_2,
        email, password, satus
    ]);
},

    findAll: () => {
        const sql = `SELECT first_name, last_name,country,disctric,city, 
                     addree_line1,address_line2,postal_code,mobile_no_1,mobile_no_2,email, 
                     satus 
                     FROM user 
                     WHERE satus = 1 
                     ORDER BY first_name ASC;`;

        return db.execute(sql);

    },

    findBytext: (input) => {
        const searchText = `%${input}%`;
        const sql = `SELECT * FROM user WHERE satus=1 AND 
                    first_name LIKE ? OR last_name LIKE ? OR  country LIKE ? 
                    OR disctric LIKE ? OR city LIKE ? OR addree_line1 LIKE ?
                    OR address_line2 LIKE ? OR postal_code LIKE ? OR mobile_no_1 LIKE ?
                    OR mobile_no_2 LIKE ? OR email LIKE ?`;

        return db.execute(sql, [searchText, searchText, searchText, searchText,
            searchText, searchText, searchText, searchText, searchText, searchText,
            searchText]);

    },

    findById: (UserId) => {
        const sql = `SELECT * FROM user WHERE satus=1 AND user_id=?`;
        return db.execute(sql, [UserId]);
    },


    update: (user, UserId) => {
        const { first_name, last_name, country, disctric, city, addree_line1,
            address_line2, postal_code, mobile_no_1, mobile_no_2,
            email, password } = user;

        const sql = `UPDATE user SET first_name=?, last_name=?, country=?,
         disctric=?, city=?, addree_line1=?, address_line2=?, postal_code=?, mobile_no_1=?, mobile_no_2=?,
          email=?, password=? WHERE user_id=?`;

        return db.execute(sql, [first_name, last_name, country, disctric, city, addree_line1, address_line2, postal_code, mobile_no_1, mobile_no_2, email, password, UserId]);

    },



    delete: (UserId) => {
        const sql = `UPDATE user SET satus = 0 WHERE user_id = ?`;
        return db.execute(sql, [UserId]);
    },



}

module.exports = userModel;

