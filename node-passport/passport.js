const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const JWT_SECRET = require('../node-passport/keys');
const LocalStrategy = require('passport-local').Strategy;


const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
  User.findOne({ username: username })
    .then(_user => {
      user = _user;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtOptions = {} 
jwtOptions.secretOrKey = JWT_SECRET;
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.algorithms = ['HS256'];

const strategyJwt = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  const User = users[__.findIndex(users, {id: jwt_payload.id})];
  if (User) {
    next(null, User);  
  } else {
    next(null, false);
  }
});
module.exports = {
  strategyJwt,
  localStrategy
};