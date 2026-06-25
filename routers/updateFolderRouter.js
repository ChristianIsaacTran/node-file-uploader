const { Router } = require("express");
const updateFolderController = require("../controllers/updateFolderController");
const updateFolderRouter = Router();

updateFolderRouter.get("/{*filepath}", updateFolderController.renderUpdateFolderForm);

module.exports = updateFolderRouter;
