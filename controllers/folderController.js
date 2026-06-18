const db = require("../models/dbQuery");

// checks to see if user has a root folder or not. if not, create one. if yes, display folder link.
async function createRootFolder(req, res) {
    console.log(req.user);
    const rootFolder = await db.checkRootFolderExists(req.user.id);

    res.redirect("/");
}

// get the contents of the current folder route
async function dynamicFolderDisplay(req, res) {
    let currentRoute = req.params.filepath;
    currentRoute = currentRoute.join("/");
    console.log(currentRoute);
    const currentFolder = await db.getFolder(currentRoute);
    console.log("CURRENT FOLDER INSIDE DISPLAY");
    console.log(currentFolder);

    const files = await db.getFiles(currentFolder.id);

    console.log(files);

    res.render("folder", {files: files, currentRoute: currentRoute});
}

module.exports = {createRootFolder, dynamicFolderDisplay}