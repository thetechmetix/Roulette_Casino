const express = require('express');
const router = express.Router();
const User = require('../models/user');


//Get Users
router.get('/GetUsers', function (req, res, next) {
    User.getUsers(function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

//Get User By Id
router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        User.getUserById(req.params.id, function (err, rows) {
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

//Create New User
router.post('/', function (req, res, next) {
    User.addUser(req.body, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Delete User By Id
router.delete('/:id', function (req, res, next) {
    User.deleteUser(req.params.id, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Update User By Id
router.put('/:id', function (req, res, next) {
    User.updateUser(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

module.exports = router;
