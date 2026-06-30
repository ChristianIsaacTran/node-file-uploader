const db = require("../models/dbQuery");
const { body, validationResult, matchedData } = require("express-validator");

async function renderUpdateFolderForm(req, res) {
  const currentRoute = req.query.currentRoute;
  const updateFolderName = req.query.folderName;
  const fullRoute = req.params.filepath.join("/");

  res.render("updateFolderForm", {
    updateFolderName: updateFolderName,
    currentRoute: currentRoute,
    fullRoute: fullRoute,
    folderErrArr: null,
    nameExists: false,
  });
}

const updateFolderValidationChain = [
  body("newFolderName")
    .trim()
    .notEmpty()
    .withMessage("Folder name cannot be empty"),
];

// submit form and update the database with the updated folder name
async function updateFolder(req, res) {
  const currentRoute = req.params.filepath.join("/");
  const fullRoute = req.query.fullFilePath;
  const newFolderName = req.body.newFolderName;
  const previousFolderName = req.query.previousFolderName;
  const folderToUpdate = await db.getFolder(fullRoute, req.user.id);

  const result = validationResult(req);

  // validation error check
  if (!result.isEmpty()) {
    return res.status(400).render("updateFolderForm", {
      updateFolderName: previousFolderName,
      currentRoute: currentRoute,
      fullRoute: fullRoute,
      folderErrArr: result.array(),
      nameExists: false,
    });
  }

    const testRoute = `${currentRoute}${req.body.newFolderName}/`;

    // check if folder exists in current directory
  const foundFolder = await db.getFolder(testRoute, req.user.id);
  let folderExists = false;

  if (foundFolder) {
    folderExists = true;
  } else {
    folderExists = false;
  }

  if (folderExists) {
    return res.status(400).render("updateFolderForm",{
      updateFolderName: previousFolderName,
      currentRoute: currentRoute,
      fullRoute: fullRoute,
      nameExists: true,
      folderErrArr: null,
    });
  }

  const data = matchedData(req);

  // send request to db query to update the route, and the folder name. Also update any nested folder
  await db.updateFolderName(
    currentRoute,
    fullRoute,
    previousFolderName,
    data.newFolderName,
    folderToUpdate.id,
  );

  // redirect back to the current route after update operation
  res.redirect(`/folder/${currentRoute}`);
}

const postUpdateForm = [updateFolderValidationChain, updateFolder];

module.exports = { renderUpdateFolderForm, postUpdateForm };

