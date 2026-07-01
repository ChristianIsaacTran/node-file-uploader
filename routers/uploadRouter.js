const {Router} = require("express");
const uploadController = require("../controllers/uploadController");

const uploadRouter = Router();

uploadRouter.get("/{*filepath}", uploadController.renderUploadForm);

uploadRouter.post("/{*filepath}", uploadController.postFileForm);

module.exports = uploadRouter;