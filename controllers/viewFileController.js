const db = require("../models/dbQuery");

async function viewFile(req, res) {
    const fileId = req.query.fileId;

    const file = await db.getFile(fileId);

    const currentRoute = req.params.filepath.join("/");

    res.render("viewFile", {file: file, currentRoute: currentRoute});
}

module.exports = { viewFile };
