const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

//Get Transaction
router.get('/GetTransactions', function (req, res, next) {    
    Transaction.getTransactions(function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

//Get Transaction By User Id
router.get('/GetTransactionByUserId', function (req, res, next) {    
    if (req.query.UserId) {
        Transaction.getTransactionByUserId(req.query.UserId, function (err, rows) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, data: rows });
            }
        });
    } else {
        res.json({ success: false, message: "User id parameter missing." })
    }
});


//Get Transaction By Game Id
router.get('/GetTransactionByGameId', function (req, res, next) {    
    if (req.query.GameId) {
        Transaction.getTransactionByGameId(req.query.GameId, function (err, rows) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, data: rows });
            }
        });
    } else {
        res.json({ success: false, message: "Game id parameter missing." })
    }
});

//Get Transaction By Id
router.get('/:id?', function (req, res, next) {    
    if (req.params.id) {
        Transaction.getTransactionById(req.params.id, function (err, rows) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, data: rows });
            }
        });
    } else {
        res.json({ success: false, message: "Transaction id parameter missing." })
    }
});

//Create New Transaction
router.post('/', function (req, res, next) {    
    Transaction.addTransaction(req.body, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Delete Transaction By Id
router.delete('/:id', function (req, res, next) {    
    Transaction.deleteTransaction(req.params.id, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Update Transaction By Id
router.put('/:id', function (req, res, next) {    
    Transaction.updateTransaction(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

module.exports = router;
