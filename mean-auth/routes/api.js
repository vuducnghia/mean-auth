var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Book = require('../models/book');
router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'please pass name and password' });
    }
    else {
        var newName = new User({
            username: req.body.username,
            password: req.body.password
        });
        newName.save(function (err) {
            if (err) {
                res.json({ success: false, msg: 'user already exist' });
            } else {
                res.json({ success: true, msg: 'create success' })
            }
        });
    }
});
router.post('/login', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user, config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    })
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name // tai sao lai la name : chu khong phai username
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                res.json({ success: true, msg: 'Welcome in the member area ' + user.username + '!' });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided' });
    }
});

router.post('/book', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
        });
        newBook.save(function(err){
            if (err) {
                res.json({ success: false, msg: 'save book error' });
            } else {
                res.json({ success: true, msg: 'save book success' })
            }
        });
    }else{
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

router.get('/book', function(req, res){

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