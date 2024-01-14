const express = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");
const plaidAPIRouter = require("./routes/plaidAPI");
const authenticationRouter = require("./routes/auth");
const accountRouter = require("./routes/account");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const session = require("express-session");
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

require("./configs/dbConfig");

const passport = require("passport");
require("./configs/passportConfig");
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/plaid", plaidAPIRouter);
app.use("/auth", authenticationRouter);
app.use("/account", accountRouter);

app.listen(PORT || 3001, () => {
    console.log(`App listening on port ${PORT}`);
});
