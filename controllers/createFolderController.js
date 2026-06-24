const { body, validationResult, matchedData } = require("express-validator");
const db = require("../models/dbQuery");

//creates inner folders in current folder route. The root will always be the first folder
async function renderCreateFolderForm(req, res) {
  let currentRoute = req.params.filepath;
  console.log(currentRoute);
  currentRoute = currentRoute.join("/");
  console.log(currentRoute);

  res.render("createFolderHereForm", {
    currentRoute: currentRoute,
    folderErrArr: null,
  });
}

const createFolderValidationChain = [
  body("folderName")
    .trim()
    .notEmpty()
    .withMessage("Folder name cannot be empty"),
];

// take the submitted name from form and creates a new folder inside current route
const createFolderHere = [
  createFolderValidationChain,
  async (req, res) => {
    let currentRoute = req.params.filepath;

    // get the previous folder to track current working directory
    const parentFolder = currentRoute[currentRoute.length - 2];

    currentRoute = currentRoute.join("/");

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res
        .status(400)
        .render("createFolderHereForm", {
          currentRoute: currentRoute,
          folderErrArr: result.array(),
        });
    }

    const data = matchedData(req);

    console.log(req.user);

    await db.createFolder(
      currentRoute,
      data.folderName,
      req.user.id,
      parentFolder,
    );

    res.redirect(`/folder/${currentRoute}`);
  },
];

module.exports = { renderCreateFolderForm, createFolderHere };
