const db = require("../models/dbQuery");
const {body, validationResult, matchedData} = require("express-validator");

// render the signup form
function renderSignupForm(req, res) {
    res.render("signupForm", {err: false, prevInput: undefined});
}

const signupValidationChain = [
    body("username").trim().notEmpty().withMessage("Username cannot be empty").isLength({max: 255}).withMessage("Username must be less than 255 characters"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
    body("confirmPass").trim().notEmpty().withMessage("Password confirmation cannot be empty").custom((value, {req}) => {
        return value === req.body.password; //boolean to check if confirm password matches password input
    }).withMessage("Password confirmation must match the password field")
];

// add a new user to db on signup form submission
const addUser = [ signupValidationChain , async (req, res) => {
    
    const result = validationResult(req);

    // validation fail
    if(!result.isEmpty()) {
        return res.status(400).render("signupForm", {err: true, errorArr: result.array(), prevInput: req.body});
    }

    // validation success
    const data = matchedData(req);

    await db.insertUser(data.username, data.password);

    res.redirect("/");
}];

module.exports = {renderSignupForm, addUser};