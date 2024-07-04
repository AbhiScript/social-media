const express = require("express");
const path = require("path");
const app = express.Router();

const homePage = path.join(__dirname, "../../client/index.html");


app.get('/', (req, res) => {
    res.sendFile(homePage);
})


module.exports = app;