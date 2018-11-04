const db = require('../config/dbconnection');

let Chips = {    
    getChips: function (callback) {
        return db.query(`SELECT c.* FROM \`Chips\` c WHERE IFNULL(c.IsDeleted,0) = 0 ORDER BY CreatedOn DESC `, callback);
    },    
    getChipsById: function (id, callback) {
        return db.query("SELECT * FROM \`Chips\` WHERE IFNULL(IsDeleted,0) = 0 AND `ChipsId`=?", [id], callback);
    },
    addChips: function (Chips, callback) {
        return db.query(`INSERT INTO \`Chips\`
                            (
                                \`UserId\`,
                                \`Balance\`,
                                \`CreatedOn\`,
                                \`CreatedBy\`,
                                \`IsActive\`
                            ) 
                            VALUES(?,?,NOW(),?,?)
                        `,
            [
                Chips.UserId,
                Chips.Balance,
                Chips.CreatedBy,
                1
            ], callback);
    },
    deleteChips: function (id, callback) {
        return db.query("UPDATE \`Chips\` SET IsDeleted = 1, DeletedOn = NOW() WHERE IFNULL(IsDeleted,0) = 0 AND `ChipsId`=? ", [id], callback);
    },
    updateChips: function (id, Chips, callback) {
        return db.query(`UPDATE \`Chips\` SET 
                                \`UserId\` = ?,
                                \`Balance\` = ?,
                                \`IsActive\` = ?,
                                \`UpdatedBy\` = ?,
                                \`UpdatedOn\` = NOW()
                            WHERE IFNULL(IsDeleted,0) = 0 
                                AND \`ChipsId\` = ? 
                        `,
            [
                Chips.UserId,
                Chips.Balance,
                (Chips.IsActive ? +Chips.IsActive : 0),
                Chips.UpdatedBy,
                id
            ], callback);
    }
}

module.exports = Chips;