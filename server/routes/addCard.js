const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');

const post = require('../schema/postSchema');

router.post('/', upload.single('image'), async (req, res) => {
    const { title, caption, email } = req.body;
    let imageURL
    if (req.file) {
        imageURL = `/assets/${req.file.originalname}`;
    }
    if (!title) {
        return res.status(400).json({ message: 'Missing data' });
    }
    const userData = new post({
        email: email,
        title: title,
        caption: caption,
        image: imageURL
    });
    try {
        await userData.save();
        res.status(200).json({ message: 'Post Card uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router;
