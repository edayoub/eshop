var express = require('express');
var router = express.Router();
const {ensurAuthenticated}=require('../helper/auth');
/* GET users listing. */
router.get('/',ensurAuthenticated, function(req, res, next) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
