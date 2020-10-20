require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

const bookmarkRoute = require('./routes/bookmarks');
const tagRoute = require('./routes/tags');

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/bookmark',bookmarkRoute);
app.use('/tag',tagRoute);

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/Triveous",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=> {
    console.log("Connected");
})

app.get('/',(req,res) => {
    res.render('home');
});

app.listen(5000, () => {
    console.log("listening on 5000");
})