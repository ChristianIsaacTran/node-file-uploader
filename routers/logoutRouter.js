const {Router} = require("express");
const logoutController = require("../controllers/logoutController");

const logoutRouter = Router();

logoutRouter.get("/", logoutController.logout)

module.exports = logoutRouter;