const db = require('../config/dbconnection');

let User = {    
    getUsers: function (callback) {
        return db.query(`SELECT u.UserId, u.Email, u.MobileNo, u.TokenNo, u.IsActive, u.CreatedBy,u.CreatedOn, u.UpdatedBy, u.UpdatedOn FROM \`User\` u WHERE IFNULL(u.IsDeleted,0) = 0`, callback);
    },    
    getUserById: function (id, callback) {
        return db.query("SELECT u.UserId, u.Email, u.MobileNo, u.TokenNo, u.IsActive, u.CreatedBy,u.CreatedOn, u.UpdatedBy, u.UpdatedOn FROM \`User\` u WHERE IFNULL(u.IsDeleted,0) = 0 AND u.`UserId`=?", [id], callback);
    },
    addUser: function (User, callback) {
        return db.query(`INSERT INTO \`User\`
                            (
                                \`Email\`,
                                \`MobileNo\`,
                                \`Password\`,
                                \`IsActive\`
                            ) 
                            VALUES(?,?,?,?)
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
                                \`UpdatedBy\` = ?,
                                \`UpdatedOn\` = NOW()
                            WHERE IFNULL(IsDeleted,0) = 0 
                                AND \`UserId\` = ? 
                        `,
            [
                User.Email,
                User.MobileNo,
                (User.IsActive ? +User.IsActive : 0),
                User.UpdatedBy,
                id
            ], callback);
    },
    logoutUser: function (User, callback) {
        return db.query("UPDATE \`User\` SET TokenNo = NULL WHERE IFNULL(IsDeleted,0) = 0 AND `UserId`=? ", [User.UserId], callback);
    },
}

module.exports = User;