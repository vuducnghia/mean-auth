var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Book = require('../models/book');

router.post('/book', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var newBook = new Book(req.body);
        newBook.save(function (err) {
            if (err) {
                res.json({ success: false, msg: 'save book error' });
            } else {
                res.json({ success: true, msg: 'save book success' })
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

/* GET ALL BOOKS */
router.get('/book', function(req, res, next) {
    console.log('get book');
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


module.exports = router;