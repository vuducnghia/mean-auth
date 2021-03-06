var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Categories = require('../models/categories');

router.post('/categories', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var newCategories = new Categories(req.body);
        newCategories.save(function (err) {
            if (err) {
                res.json({ success: false, msg: 'save categories error' });
            } else {
                res.json({ success: true, msg: 'save categories success' })
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

router.get('/categories', function (req, res) {
    Categories.find(function (err, categories) {
        if (err) return next(err);
        res.json(categories);
    });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        console.log(decoded);
        if (decoded._doc.roles === 'admin') {
            Categories.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                console.log('delete success');                
                res.json(post);
            })
        }
    }
})

getToken = function (headers) {
    console.log('header : ' + headers);
    console.log('header.au : ' + headers.authenticate);
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