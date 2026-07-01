const db = require("../models/dbQuery");


async function downloadFile(req, res) {
    const fileId = req.query.fileId;

    // get file based on file id, then send to user through res.download
    const file = await db.getFile(fileId);

    const fileSystemLocation = file.fileLocation;

    const originalFileName = file.fileName;

    // sends user the download file through filesystem path
    res.download(fileSystemLocation, originalFileName, (error) => {
        if(error) {
            // report any errors with download operation
            console.log(error);
        }
    });
}

module.exports = {downloadFile};

/*
    note: res.download and other backend frameworks have something 
    similar to send a "download" request as a response to the user, 
    but the WAY the browser downloads the file is configured on the 
    browser itself. My google browser is set to instantly download 
    the file and put it into the "downloads" folder, but if I set 
    google to "always ask" before downloading, the browser opens 
    up a window to give the user dontrol over the filename and 
    file download location. I misunderstood and thought that 
    the way the file is downloaded is a backend responsibility, not 
    a browser responsibility.
*/

