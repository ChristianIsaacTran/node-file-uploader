const express = require("express");
const path = require("node:path");
const sessionConfig = require("../config/sessionConfig");
const passport = require("../config/passportConfig");


const app = express();

// express app config with static asset
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// setup session support with passport and express-session
app.use(sess)


const port = process.env.PORT || 3000;

app.listen(port, (error) => {
    if(error) {
        console.log(error);
        throw new Error(error);
    }

    console.log("Server started.");
});