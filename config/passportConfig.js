const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(async(username, password, done) => {
    try {
        

        // successful authentication
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        // find user again through given id, then return found user
        
    } catch (error) {
        return done(error);
    }
});