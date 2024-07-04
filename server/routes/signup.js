const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const user = require('../schema/userSchema');

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const fetchedData = await user.findOne({ email: email })
    if (fetchedData) {
        return res.status(409).send("Email already exists");
    }
    const data = new user({
        name: name,
        email: email,
        password: password
    });
    await data.save();
    res.status(200).json({ message: "User signed up successfully!", data: data });

})

module.exports = router;