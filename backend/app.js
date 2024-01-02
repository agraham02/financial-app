const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT || 3001, () => {
    console.log(`App listening on port ${PORT}`);
});
