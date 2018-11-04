const express = require('express');
const router = express.Router();
const Chips = require('../models/chips');

//Get Chips
router.get('/GetChips', function (req, res, next) {    
    Chips.getChips(function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

//Get Chips By Id
router.get('/:id?', function (req, res, next) {    
    if (req.params.id) {
        Chips.getChipsById(req.params.id, function (err, rows) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, data: rows });
            }
        });
    } else {
        res.json({ success: false, message: "Chips id parameter missing." })
    }
});

//Create New Chips
router.post('/', function (req, res, next) {    
    Chips.addChips(req.body, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Delete Chips By Id
router.delete('/:id', function (req, res, next) {    
    Chips.deleteChips(req.params.id, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Update Chips By Id
router.put('/:id', function (req, res, next) {    
    Chips.updateChips(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

module.exports = router;
