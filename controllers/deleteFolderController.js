const db = require("../models/dbQuery");

async function deleteFolder(req, res) {
  const pathToFolder = req.params.filepath.join("/");

  const folderNameToDelete = req.query.folderName;

  const currentRoute = req.query.currentRoute;

  //   delete folder and all other folders that have it as a parent
  await db.deleteFolder(pathToFolder, folderNameToDelete);

  res.redirect(`/folder/${currentRoute}`);
}

module.exports = { deleteFolder };
