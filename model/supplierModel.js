const db = require("../config/database");

const supplierModel = {

    create: (supplier) => {
        const {seller_id,supplier_name,address,tel_no,status=1} = supplier;
        const sql = `INSERT INTO supplier (seller_id ,supplier_name ,address ,tel_no ,
                     status ,created_at ,updated_at ) VALUES (?,?,?,?,?,NOW(),NOW());`
        
       return db.execute(sql,[seller_id,supplier_name,address,tel_no,status]);              
    },

    findAl: () => {
        const sql = `SELECT seller_id,supplier_name,address,address FROM supplier 
                      WHERE status=1 ORDER BY supplier_name ASC `;
        return db.execute(sql);
    },

    findBytext: (input) => {
        const searchtext = `%${input}%`;
        const sql = `SELECT * FROM supplier  WHERE status = 1 AND 
                    (supplier_name LIKE ? OR address LIKE ? OR tel_no LIKE ?)`;
        return db.execute(sql,[searchtext,searchtext,searchtext]);
    },

    update: (supplier,supplierId) => {
        const {seller_id,supplier_name,address,tel_no} = supplier;
        const sql = `UPDATE supplier SET seller_id = ?, supplier_name = ?, address = ?, tel_no = ? WHERE supplier_id = ?;`;
        return db.execute(sql,[seller_id,supplier_name,address,tel_no,supplierId]);
    },

    delete: (supplierId) => {
        const sql = `UPDATE supplier SET status = 0 WHERE supplier_id = ?`;
        return db.execute(sql,[supplierId]);
    },
    

}


module.exports = supplierModel;

