const db = require("../models/dbQuery");

async function deleteFolder(req, res) {
  const pathToFolder = req.params.filepath.join("/");

  const folderToDelete = await db.getFolder(pathToFolder ,req.user.id);

  const currentRoute = req.query.currentRoute;

  //   delete folder and all other folders that have it as a parent
  await db.deleteFolder(pathToFolder, folderToDelete.id);

  res.redirect(`/folder/${currentRoute}`);
}

module.exports = { deleteFolder };
