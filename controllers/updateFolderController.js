const db = require("../models/dbQuery");

async function renderUpdateFolderForm(req, res) {
  const currentRoute = req.query.currentRoute;
  const updateFolderName = req.query.folderName;
  const fullRoute = req.params.filepath.join("/");

  res.render("updateFolderForm", {
    updateFolderName: updateFolderName,
    currentRoute: currentRoute,
    fullRoute: fullRoute,

  });
}

// submit form and update the database with the updated folder name
async function postUpdateForm(req, res) {
    const currentRoute = req.params.filepath.join("/");
    const fullRoute = req.query.fullFilePath;
    const newFolderName = req.body.newFolderName;
    const previousFolderName = req.query.previousFolderName;

    // send request to db query to update the route, and the folder name. Also update any nested folder
    await db.updateFolderName(currentRoute, fullRoute, previousFolderName, newFolderName);

    // redirect back to the current route after update operation
    res.redirect(`/folder/${currentRoute}`);
}

module.exports = { renderUpdateFolderForm, postUpdateForm };
