// passport.js

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

console.log( "test", opts.jwtFromRequest );

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        console.log( "test 123", jwt_payload )
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                console.error(err);
                return done(err, false)
            });
    }));
}