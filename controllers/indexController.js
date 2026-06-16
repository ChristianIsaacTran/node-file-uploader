const passport = require("passport");

function renderHome(req, res){

    res.render("index", {user: req.user, loginError: req.session.messages});

    // clear the authentication error messages array after display
    if(req.session.messages) {
        req.session.messages = [];
    }
}

const authenticate = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true
});


module.exports = {renderHome, authenticate};