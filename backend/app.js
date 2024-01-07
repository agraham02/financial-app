const express = require("express");
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");
const plaidAPIRouter = require("./routes/plaidAPI");
const authenticationRouter = require("./routes/auth");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());

require("./configs/dbConfig");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/plaid", plaidAPIRouter);
app.use("/auth", authenticationRouter);

app.listen(PORT || 3001, () => {
    console.log(`App listening on port ${PORT}`);
});
