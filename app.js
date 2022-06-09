const config = require('./utils/config') //need to import this essentially everywhere as long as I'm accessing env pariables
const mongoose = require('mongoose')
const express = require('express')
require("express-async-errors");
const app = express();
const path = require('path')
const cors = require('cors')
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log("connected to db");
    })
    .catch((error) => {
        console.log("error", error);
    });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());
app.use(express.json()); //this is what allows backend to recieve json
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// app.get('/', (request, response) => {
//     response.send('<p>yo</p>');
// })

app.use(middleware.errorHandler); //this error handler needs to go at the end

module.exports = app;