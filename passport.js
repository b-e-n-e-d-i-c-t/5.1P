const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const fakeToken = require('./fakeToken.json')
users = [{ username: "user1", password: "123"}]

const opts = {
    secretOrKey: 'secret',
    jwtFromRequest: getJwt
  };


function getJwt(){
    console.log(`Get JWT: ${fakeToken.Authorization?.substring(7)} `)
    return fakeToken.Authorization?.substring(7)
}
passport.use(new localStrategy((username, password, done) => {
    const user = users.find(user => user.username === username);
    console.log("Local Authentication")
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }))

passport.use(new jwtStrategy(opts, async(token, done) => {
    console.log("Trying to use jwtStrategy")
    return done(null, token.username)
}
))

  module.exports = passport