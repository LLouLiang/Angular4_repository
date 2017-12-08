const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const config = require('../databaseConfig/mongodb');
module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = config.secret;
    // jwt_payload is an object literal containing the decode json web token payload.
    // done is a passport error first callback accepting arguments done -> error user info
    passport.use(new JwtStrategy(opts,(jwt_payload,done) => {
        // Find that kind of user who have had registered
        // properly an error here with jwt_payload._id
        User.getUserbyId( jwt_payload.user._id, (err,user) => {
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        })
    }));
}