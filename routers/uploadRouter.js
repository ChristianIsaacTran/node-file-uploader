const {Router} = require("express");
const uploadController = require("../controllers/uploadController");

const uploadRouter = Router();

uploadRouter.get("/", uploadController.renderUploadForm);

uploadRouter.post("/", uploadController.postFileForm);

module.exports = uploadRouter;