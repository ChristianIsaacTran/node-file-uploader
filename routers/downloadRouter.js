const {Router} = require("express");
const downloadController = require("../controllers/downloadController");

const downloadRouter = Router();

downloadRouter.get("/", downloadController.downloadFile);

module.exports = downloadRouter;