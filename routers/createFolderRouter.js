const { Router } = require("express");
const createFolderController = require("../controllers/createFolderController");

const createFolderRouter = Router();

createFolderRouter.get("/{*filepath}", createFolderController.renderCreateFolderForm);

createFolderRouter.post("/{*filepath}", createFolderController.createFolderHere);

module.exports = createFolderRouter;
