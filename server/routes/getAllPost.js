const express = require("express");
const router = express.Router();
const postUser = require("../schema/postSchema");

router.get('/', async (req, res) => {
    try {
        const posts = await postUser.find({});
        res.status(200).json(posts);
    } catch (Error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;