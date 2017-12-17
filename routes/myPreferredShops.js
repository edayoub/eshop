var express = require('express');
var router = express.Router();
const {ensurAuthenticated}=require('../helper/auth');
/* GET users listing. */
router.get('/',ensurAuthenticated, function(req, res, next) {
    res.send('ok');
});

module.exports = router;
