const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost/cardData', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connect', () => {
    console.log("mongoDB connected");
});
mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error: " + err);
});

const signUpRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const addCardRoute = require('./routes/addCard');
const getUserPost = require('./routes/getUserPost');
const getAllPost = require('./routes/getAllPost');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use((req, res, next) => {
    if (req.url.endsWith('.jsx')) {
        res.type('application/javascript');
    }
    next();
});

app.use('/signup', signUpRoute);
app.use('/login', loginRoute);
app.use('/addCard', addCardRoute);
app.use('/getUserPost', getUserPost);
app.use('/getAllPost', getAllPost);

app.use('/assets', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = 7700;
app.listen(port, () => {
    console.log(`Server started listening at http://localhost:${port}`);
});
