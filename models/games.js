const db = require('../config/dbconnection');

let Games = {    
    getGames: function (callback) {
        return db.query(`SELECT c.* FROM \`Games\` c WHERE IFNULL(c.IsDeleted,0) = 0`, callback);
    },    
    getGamesById: function (id, callback) {
        return db.query("SELECT * FROM \`Games\` WHERE IFNULL(IsDeleted,0) = 0 AND `GameId`=?", [id], callback);
    },
    addGames: function (Game, callback) {
        return db.query(`INSERT INTO \`Games\`
                            (
                                \`Name\`,
                                \`Description\`,
                                \`Tutorial\`,
                                \`UserId\`,
                                \`CreatedOn\`,
                                \`CreatedBy\`,
                                \`IsActive\`
                            ) 
                            VALUES(?,?,?,?,NOW(),?,?)
                        `,
            [
                Game.Name,
                Game.Description,
                Game.Tutorial,
                Game.UserId,
                Game.CreatedBy,
                1
            ], callback);
    },
    deleteGames: function (id, callback) {
        return db.query("UPDATE \`Games\` SET IsDeleted = 1, DeletedOn = NOW() WHERE IFNULL(IsDeleted,0) = 0 AND `GameId`=? ", [id], callback);
    },
    updateGames: function (id, Game, callback) {
        return db.query(`UPDATE \`Games\` SET 
                                \`Name\` = ?,
                                \`Description\` = ?,
                                \`Tutorial\` = ?,
                                \`UserId\` = ?,                                
                                \`IsActive\` = ?,
                                \`UpdatedBy\` = ?,
                                \`UpdatedOn\` = NOW()
                            WHERE IFNULL(IsDeleted,0) = 0 
                                AND \`GameId\` = ? 
                        `,
            [
                Game.Name,
                Game.Description,
                Game.Tutorial,
                Game.UserId,
                (Game.IsActive ? +Game.IsActive : 0),
                Game.UpdatedBy,
                id
            ], callback);
    }
}

module.exports = Games;