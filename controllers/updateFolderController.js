const db = require("../models/dbQuery");

async function renderUpdateFolderForm(req, res) {
    const currentRoute = req.query.currentRoute;
    const updateFolderName = req.query.folderName;
    const fullRoute = req.params.filepath.join("/");

    res.render("updateFolderForm", {updateFolderName: updateFolderName, currentRoute: currentRoute, fullRoute: fullRoute });
}

module.exports = {renderUpdateFolderForm};
