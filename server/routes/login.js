const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const user = require("../schema/userSchema");

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const fetchedData = await user.findOne({ email: email });
        if (!fetchedData) {
            return res.status(404).send("Email not found");
        }

        if (fetchedData.password !== password || fetchedData.email !== email) {
            return res.status(401).send("Invalid username and password");
        }

        const secretKey = "card@Data";
        const token = jwt.sign({ email: email }, secretKey);
        res.json({ token, fetchedData });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

router.get('/setToken', (req, res) => {
    const { email } = req.query;
    const secretKey = "card@Data";
    const token = jwt.sign({ email: email }, secretKey);
    res.json({ token });
});

module.exports = router;
