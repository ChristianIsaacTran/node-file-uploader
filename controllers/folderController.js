const db = require("../models/dbQuery");

// checks to see if user has a root folder or not. if not, create one. if yes, display folder link.
async function createRootFolder(req, res) {
  const rootFolder = await db.checkRootFolderExists(req.user.id);

  res.redirect("/");
}

// get the contents of the current folder route
async function dynamicFolderDisplay(req, res) {
  let currentRoute = req.params.filepath;

  const previousRoute = `${currentRoute.slice(0, -2).join("/")}/`;

  currentRoute = currentRoute.join("/");
  const currentFolder = await db.getFolder(currentRoute, req.user.id);

  const files = await db.getFiles(currentFolder.id);

  const subFolders = await db.getSubFolders(
    currentRoute,
    req.user.id,
    currentFolder.id,
  );

  res.render("folder", {
    files: files,
    currentRoute: currentRoute,
    currentFolderName: currentFolder.folderName,
    subFolders: subFolders,
    previousRoute: previousRoute,
  });
}

module.exports = { createRootFolder, dynamicFolderDisplay };
