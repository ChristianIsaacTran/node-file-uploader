const { Router } = require("express");
const viewFileController = require("../controllers/viewFileController");

const viewFileRouter = Router();

viewFileRouter.get("/{*filepath}", viewFileController.viewFile);

module.exports = viewFileRouter;
