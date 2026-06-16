const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("../models/prisma");

const oneDayInMiliseconds = 1000 * 60 * 60 * 24;

module.exports = session({
  store: new PrismaSessionStore(prisma, {}), //session storage goes here
  secret: "Hatsune Miku Fortnite",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDayInMiliseconds },
});
