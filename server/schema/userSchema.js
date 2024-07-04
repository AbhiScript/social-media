const mongoose = require("mongoose");

const userData = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    ActiveStatus: Boolean
});

const userModel = new mongoose.model("userData", userData);

module.exports = userModel;