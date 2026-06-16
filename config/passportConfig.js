const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models/dbQuery");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUser(username);

      // user found check
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      // password input matches db hashed password check
      if (!passwordMatch) {
        return done(null, false, {
          message: "Password does not match in database",
        });
      }

      // successful authentication
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // find user again through given id, then send found user (done)
    const user = await db.getUserForDeserialize(id);

    if (!user) {
      throw new Error("Error: User not found in database or from session.");
    }

    done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
