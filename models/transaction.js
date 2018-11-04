const db = require('../config/dbconnection');

let Transaction = {    
    getTransactions: function (callback) {
        return db.query(`SELECT c.* FROM \`Transaction\` c WHERE IFNULL(c.IsDeleted,0) = 0 ORDER BY CreatedOn DESC `, callback);
    },    
    getTransactionById: function (id, callback) {
        return db.query("SELECT * FROM \`Transaction\` WHERE IFNULL(IsDeleted,0) = 0 AND `TransactionId`=?", [id], callback);
    },
    getTransactionByUserId: function (id, callback) {
        return db.query("SELECT * FROM \`Transaction\` WHERE IFNULL(IsDeleted,0) = 0 AND `UserId`=? ORDER BY CreatedOn DESC", [id], callback);
    },
    getTransactionByGameId: function (id, callback) {
        return db.query("SELECT * FROM \`Transaction\` WHERE IFNULL(IsDeleted,0) = 0 AND `GameId`=? ORDER BY CreatedOn DESC", [id], callback);
    },
    addTransaction: function (Transaction, callback) {
        return db.query(`INSERT INTO \`Transaction\`
                            (
                                \`UserId\`,
                                \`GameId\`,
                                \`ChipsId\`,
                                \`Balance\`,
                                \`CreditedAmount\`,
                                \`DebitedAmount\`,
                                \`Date\`,
                                \`Transaction\`,
                                \`CreatedOn\`,
                                \`CreatedBy\`,
                                \`IsActive\`
                            ) 
                            VALUES(?,?,?,?,?,?,?,?,NOW(),?,?)
                        `,
            [
                Transaction.UserId,
                Transaction.GameId,
                Transaction.ChipsId,
                Transaction.Balance,
                Transaction.CreditedAmount,
                Transaction.DebitedAmount,
                Transaction.Date,
                Transaction.Transaction,                
                Transaction.CreatedBy,
                1
            ], callback);
    },
    deleteTransaction: function (id, callback) {
        return db.query("UPDATE \`Transaction\` SET IsDeleted = 1, DeletedOn = NOW() WHERE IFNULL(IsDeleted,0) = 0 AND `TransactionId`=? ", [id], callback);
    },
    updateTransaction: function (id, Transaction, callback) {
        return db.query(`UPDATE \`Transaction\` SET 
                                \`UserId\` = ?,
                                \`GameId\` = ?,
                                \`ChipsId\` = ?,
                                \`Balance\` = ?,                                
                                \`CreditedAmount\` = ?,    
                                \`DebitedAmount\` = ?,    
                                \`Date\` = ?,    
                                \`Transaction\` = ?,                                    
                                \`IsActive\` = ?,
                                \`UpdatedBy\` = ?,
                                \`UpdatedOn\` = NOW()
                            WHERE IFNULL(IsDeleted,0) = 0 
                                AND \`TransactionId\` = ? 
                        `,
            [
                Transaction.UserId,
                Transaction.GameId,
                Transaction.ChipsId,
                Transaction.Balance,
                Transaction.CreditedAmount,
                Transaction.DebitedAmount,
                Transaction.Date,
                Transaction.Transaction,                
                (Transaction.IsActive ? +Transaction.IsActive : 0),
                Transaction.UpdatedBy,
                id
            ], callback);
    }
}

module.exports = Transaction;