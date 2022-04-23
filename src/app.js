// IMPORT

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require("body-parser");
const {router: projectsRoute} = require("../functions/projects.js");
const {router: categoriesRoute} = require("../functions/categories.js");
const {router: toolsRoute} = require("../functions/tools.js");
const {router: filesRoute} = require("../functions/files.js");
const cors = require('cors');
const upload = require('express-fileupload');
const serverless = require("serverless-http");

const app = express();

// MIDDLEWARES

app.use(bodyParser.json());
app.use(cors());
app.use(upload());
app.use("/.netlify/functions/files", express.static("assets"));

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "hello": "hi"
    });
})
app.use('/.netlify/functions/app', router);

// ROUTES

app.use("/.netlify/functions/app/projects", projectsRoute);
app.use("/.netlify/functions/app/categories", categoriesRoute);
app.use("/.netlify/functions/app/tools", toolsRoute);
app.use("/.netlify/functions/app/files", filesRoute);


// app.listen(3000, () => console.log("App is running on http://localhost:3000"));


// CONNECT TO DB

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to the database');
})


module.exports.handler = serverless(app);