const db = require('../config/dbconnection');

let Provider = {    
    getUsers: function (callback) {
        return db.query(`SELECT u.* FROM \`User\` u WHERE IFNULL(u.IsDeleted,0) = 0`, callback);
    },    
    getUserById: function (id, callback) {
        return db.query("SELECT * FROM \`User\` WHERE IFNULL(IsDeleted,0) = 0 AND `UserId`=?", [id], callback);
    },
    addUser: function (User, callback) {
        return db.query(`INSERT INTO \`User\`
                            (
                                \`Email\`,
                                \`MobileNo\`,
                                \`Password\`,
                                \`IsActive\`
                            ) 
                            VALUES(?,?,?)
                        `,
            [
                User.Email,
                User.MobileNo,
                User.Password,
                1
            ], callback);
    },
    deleteUser: function (id, callback) {
        return db.query("UPDATE \`User\` SET IsDeleted = 1, DeletedOn = NOW() WHERE IFNULL(IsDeleted,0) = 0 AND `UserId`=? ", [id], callback);
    },
    updateUser: function (id, User, callback) {
        return db.query(`UPDATE \`User\` SET 
                                \`Email\` = ?,
                                \`MobileNo\` = ?,
                                \`IsActive\` = ?,
                                \`CreatedBy\` = ?,
                                \`CreatedOn\` = NOW()
                            WHERE IFNULL(IsDeleted,0) = 0 
                                AND \`UserId\` = ? 
                        `,
            [
                User.Email,
                User.MobileNo,
                User.IsActive,
                User.CreatedBy,
                id
            ], callback);
    }
}

module.exports = Provider;