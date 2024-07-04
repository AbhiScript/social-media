const express = require("express");
const router = express.Router();
const postUser = require("../schema/postSchema");

router.get('/', async (req, res) => {
    const { email } = req.query;
    try {
        const posts = await postUser.find({ email: email });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
