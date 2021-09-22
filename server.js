const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pageRouter = require('./controller/pages');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", pageRouter);
// useFindAndModify: false
mongoose.connect('mongodb+srv://root:root@cluster0.y21un.mongodb.net/ALL-IN-ONE-IDE?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('MongoDB Atlas is connected and Express server is running...');
        });
    });
