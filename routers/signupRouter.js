const { Router } = require("express");
const signupController = require("../controllers/signupController");

const signupRouter = Router();

signupRouter.get("/", signupController.renderSignupForm);

signupRouter.post("/", signupController.addUser);

module.exports = signupRouter;
