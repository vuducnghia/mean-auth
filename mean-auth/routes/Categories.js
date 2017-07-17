var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Categories = require('../models/categories');

router.get('/categories', function (req, res) {
    Categories.find(function(err, categories){
        if(err) return next(err);
        res.json(categories);
    });
});

router.post('/caterories', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var newCategories = new Categories(res.body);
        newCategories.save(function (err) {
            if (err) {
                res.json({ success: false, msg: 'save Categories error' });
            } else {
                res.json({ success: true, msg: 'save Categories success' })
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized. Categories' });
    }
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