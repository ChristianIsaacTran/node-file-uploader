const {Router} = require("express");
const deleteFolderController = require("../controllers/deleteFolderController");

const deleteFolderRouter = Router();


deleteFolderRouter.get("/{*filepath}", deleteFolderController.deleteFolder);



module.exports = deleteFolderRouter;