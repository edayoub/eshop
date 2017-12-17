let express = require('express');
let bodyparser =require('body-parser');
let bcrypt =require('bcryptjs');
let router = express.Router();
router.use(bodyparser.urlencoded({extended:true}));
const User=require('../public/models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register',{errors:null});
});
router.post('/',(req,res)=>{
    //form validation
    let errors=[];
    if(req.body.password.length<3){
        errors.push({text:'the password must have 4 characters or higher'});
    }
    if(req.body.password!=req.body.password1){
        errors.push({text:'the passwords dont match'});
    }
    if(errors.length>0){
        return res.render('register',{errors:errors});
    }else{
        User.findOne({email:req.body.email})
            .then(user=>{
                if(user){
                    errors.push({text:'this email allready exist'});
                    return res.render('register',{errors:errors});
                }else{
                    let newUser =User({
                        email:req.body.email,
                        password:req.body.password
                    });
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            //save the user and redirect to login
                            newUser.save()
                                .then(user => {
                                    res.redirect('/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            });
    }

});

module.exports = router;
