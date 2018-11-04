const express = require('express');
const router = express.Router();
const Game = require('../models/games');

//Get Game
router.get('/GetGames', function (req, res, next) {        
    Game.getGames(function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

//Get Game By Id
router.get('/:id?', function (req, res, next) {    
    if (req.params.id) {
        Game.getGamesById(req.params.id, function (err, rows) {
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

//Create New Game
router.post('/', function (req, res, next) {    
    Game.addGames(req.body, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Delete Game By Id
router.delete('/:id', function (req, res, next) {    
    Game.deleteGames(req.params.id, function (err, count) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: count });
        }
    });
});

//Update Game By Id
router.put('/:id', function (req, res, next) {    
    Game.updateGames(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

module.exports = router;
