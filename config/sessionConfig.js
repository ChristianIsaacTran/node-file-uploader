const session = require("express-session");
const sessionStore = require("@quixo3/prisma-session-store");
const pool = require("../models/pool");

const oneDayInMiliseconds = 1000 * 60 * 60 * 24;

module.exports = session({
    store:, //session storage goes here
    secret: "Hatsune Miku Fortnite",
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: oneDayInMiliseconds}
});