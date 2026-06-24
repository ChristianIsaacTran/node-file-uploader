const { body, validationResult, matchedData } = require("express-validator");
const db = require("../models/dbQuery");

//creates inner folders in current folder route. The root will always be the first folder
async function renderCreateFolderForm(req, res) {
  let currentRoute = req.params.filepath;

  currentRoute = currentRoute.join("/");

  res.render("createFolderHereForm", {
    currentRoute: currentRoute,
    folderErrArr: null,
    nameExists: null,
  });
}


const createFolderValidationChain = [
  body("folderName")
    .trim()
    .notEmpty()
    .withMessage("Folder name cannot be empty")
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

    const testRoute = `${currentRoute}${req.body.folderName}/`;

    // check if input folder name already exists in current directory
    const foundFolder = await db.getFolder(testRoute, req.user.id);
    let folderExists = false;

    if(foundFolder) {
        folderExists = true;
    } else {
        folderExists = false;
    }

    // express-validator check
    if (!result.isEmpty()) {
      return res.status(400).render("createFolderHereForm", {
        currentRoute: `${parentFolder}/`,
        folderErrArr: result.array(),
        nameExists: false
      });
    }

    // folder name exists in same directory error check
    if(folderExists) {
        return res.status(400).render("createFolderHereForm", {
        currentRoute: `${parentFolder}/`,
        folderErrArr: null,
        nameExists: true
      });
    }

    const data = matchedData(req);

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
