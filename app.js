// IMPORT

import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import projectsRoute from "./routes/projects.js";
import categoriesRoute from "./routes/categories.js";
import toolsRoute from "./routes/tools.js";
import filesRoute from "./routes/files.js";
import cors from "cors";
import upload from "express-fileupload";

const app = express();

// MIDDLEWARES

app.use(bodyParser.json());
app.use(cors());
app.use(upload());
app.use("/files", express.static("assets"));
// ROUTES

app.use("/projects", projectsRoute);
app.use("/categories", categoriesRoute);
app.use("/tools", toolsRoute);
app.use("/files", filesRoute);

app.get('/', (req, res) => {
    res.json('Home');
})

app.listen(3000, () => console.log("App is running on http://localhost:3000"));

// CONNECT TO DB

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to the database');
})