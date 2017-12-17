var express = require('express');
var router = express.Router();
const {ensurAuthenticated}=require('../helper/auth');
const Shops=require('../public/models/shops');
/* GET users listing. */
router.get('/',ensurAuthenticated, function(req, res, next) {
    Shops.geoNear(
        {type:'Point',coordinates:[1.1,1.1]},
        {spherical:true,limit :20}

    ).then(shop=>{
        res.render('nearbyShops',{shops:shop});
        })
        .catch(err=>{
            res.send(err);
        })

});

module.exports = router;
