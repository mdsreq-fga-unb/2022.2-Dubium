const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport")
const User = require("../model/cadastroSchema.js");
const cookieExtractor = require('./cookieExtractor.js');
const { decrypt, encrypt } = require("../auth/crypto.js")
const { EventEmitter } = require("node:events")
const emitter = require("./emitter.js")

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'randomString';

passport.use(new JwtStrategy(opts, function(jwt_playload, done) {
    User.findOne({ _id: jwt_playload.secret.id })
        .then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch(err => {
            done(err, false);
        });
}));

// emitter.once("recieve", (data) => {
//     passport.use(new JwtStrategy({
//         jwtFromRequest: getJWT,
//         secretOrKey: 'randomString'
//     }, function(jwt_playload, done) {
//         const playload = JSON.parse(decrypt({iv: data, encryptedData: jwt_playload.secret}))
//         User.findOne({ _id: playload.id })
//             .then(user => {
//                 if (user) {
//                     done(null, user);
//                 } else {
//                     done(null, false);
//                 }
//             })
//             .catch(err => {
//                 done(err, false);
//             });
//     }));

// })


