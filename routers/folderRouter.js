const {Router} = require("express");
const folderController = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.get("/", folderController.createRootFolder);

folderRouter.get("/{*filepath}", folderController.dynamicFolderDisplay);


module.exports = folderRouter;