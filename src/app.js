// IMPORT

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import projectsRoute from "../functions/projects.js";
import categoriesRoute from "../functions/categories.js";
import toolsRoute from "../functions/tools.js";
import filesRoute from "../functions/files.js";
import cors from "cors";
import upload from "express-fileupload";
import serverless from "serverless-http";

const app = express();

// MIDDLEWARES

app.use(bodyParser.json());
app.use(cors());
app.use(upload());
app.use("/.netlify/functions/files", express.static("assets"));

// ROUTES

app.use("/.netlify/functions/projects", projectsRoute);
app.use("/.netlify/functions/categories", categoriesRoute);
app.use("/.netlify/functions/tools", toolsRoute);
app.use("/.netlify/functions/files", filesRoute);

app.get('/', (req, res) => {
    res.json('Home');
})

app.listen(3000, () => console.log("App is running on http://localhost:3000"));

export const handler = serverless(app);

// CONNECT TO DB

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to the database');
})