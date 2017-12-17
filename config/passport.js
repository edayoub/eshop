let Localstrategy =require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../public/models/users');
module.exports=function (passport) {
    passport.use(new Localstrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email:email})
            .then(user=>{
                if(!user){
                    return done(null,false,{message:'no user found'});
                }
                //test if the password match
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(isMatch){
                        return done(null,user);
                    }else {
                        return done(null,false,{message:'password incorrect'});
                    }
                });
            })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};