const express = require("express");
const path = require("node:path");
const sessionConfig = require("./config/sessionConfig");
const passport = require("./config/passportConfig");
const indexRouter = require("./routers/indexRouter");
const signupRouter = require("./routers/signupRouter");
const logoutRouter = require("./routers/logoutRouter");
const uploadRouter = require("./routers/uploadRouter");


const app = express();

// express app config with static asset
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// setup session support with passport and express-session
app.use(sessionConfig);
app.use(passport.session());

// routes
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/upload", uploadRouter);


const port = process.env.PORT || 3000;

app.listen(port, (error) => {
    if(error) {
        console.log(error);
        throw new Error(error);
    }

    console.log(`Server started. Listening on port ${port}`);
});