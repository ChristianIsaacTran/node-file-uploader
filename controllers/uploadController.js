
const multer = require("multer");
const upload = multer({dest: "uploads/"}); //multer instance, that accepts the dest which is the place in the local filesystem to store uploaded file
const db = require("../models/dbQuery");

// project also mentions that the files should just be stored in the local filesystem for now. I'll make a dedicated "uploads" folder

function renderUploadForm(req, res) {
    const currentRoute = req.params.filepath.join("/");

    res.render("uploadForm", {currentRoute: currentRoute});
}

/*
    multer library instance creates an "upload"
    that takes a name of the "file" input field from the form.
    upload is also a middleware that appends the file 
    to req.file, and any other body parsed data to req.body like normal
*/
const uploadMiddleware = upload.single("uploadFile");

async function parseFileForm(req, res) {
    console.log("File has been uploaded to local filesystem in the uploads folder");
    console.log(`Req.file: `);
    console.log(req.file);

    const currentRoute = req.params.filepath.join("/");

    // send file directory location to database
    await db.createUpload(req.file, currentRoute, req.user.id);


    res.redirect(`/folder/${currentRoute}`);
}

const postFileForm = [uploadMiddleware, parseFileForm]


module.exports = {renderUploadForm, postFileForm};