var express = require('express');
var passport= require('passport');
var bodyparser=require('body-parser');
var router = express.Router();

//set bodyparser
router.use(bodyparser.urlencoded({extended:true}));
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});


router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/nearbyShops',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;
