const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    email: String,
    title: String,
    caption: String,
    image: String
});

const Post = mongoose.model('userPost', postSchema);
module.exports = Post;