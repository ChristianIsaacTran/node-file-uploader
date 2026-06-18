const passport = require("passport");
const db = require("../models/dbQuery");

async function renderHome(req, res) {
  let rootFolder = null;

  if (req.user) {
    //if user is logged in, get root folder from db
    rootFolder = await db.checkRootFolderExists();
  }

  res.render("index", {
    user: req.user,
    loginError: req.session.messages,
    rootFolder: rootFolder,
  });

  // clear the authentication error messages array after display
  if (req.session.messages) {
    req.session.messages = [];
  }
}

const authenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureMessage: true,
});

module.exports = { renderHome, authenticate };
