const express = require("express");
const path = require("node:path");
const sessionConfig = require("./config/sessionConfig");
const passport = require("./config/passportConfig");
const indexRouter = require("./routers/indexRouter");
const signupRouter = require("./routers/signupRouter");
const logoutRouter = require("./routers/logoutRouter");
const uploadRouter = require("./routers/uploadRouter");
const folderRouter = require("./routers/folderRouter");
const createFolderRouter = require("./routers/createFolderRouter");
const deleteFolderRouter = require("./routers/deleteFolderRouter");
const updateFolderRouter = require("./routers/updateFolderRouter");
const viewFileRouter = require("./routers/viewFileRouter");

const app = express();

// express app config with static asset
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// setup session support with passport and express-session
app.use(sessionConfig);
app.use(passport.session());

// routes
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/upload", uploadRouter);
app.use("/folder", folderRouter);
app.use("/create", createFolderRouter);
app.use("/delete", deleteFolderRouter);
app.use("/update", updateFolderRouter);
app.use("/view", viewFileRouter);

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    throw new Error(error);
  }

  console.log(`Server started. Listening on port ${port}`);
});
