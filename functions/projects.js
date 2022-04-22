import express from "express";
import mongoose from "mongoose";
import { Project } from "./../models/Project.js";
import { Category } from "../models/Category.js";
import { Tool } from "../models/Tool.js";
import { uploadFiles } from "../utils/index.js";
import * as fsPromises from "fs/promises";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
        return;
    } catch (error) {
        res.json({error});
        return;
    }
})

router.get('/:id', async (req, res) => {
    try {
        const projects = await Project.findById(req.params.id);
        res.json(projects);
        return;
    } catch (error) {
        res.json({error});
        return;
    }
})

router.post('/', async (req, res) => {

    // Generate id
    var id = mongoose.Types.ObjectId();

    // Upload files
    
    const {cover, files} = await getCoverAndFiles(req.files, req.body.files, req.body.cover, id);

    const project = new Project({
        _id: id,
        name: req.body.name,
        date: req.body.date,
        categories: req.body.categories,
        cover,
        contributors: req.body.contributors,
        links: req.body.links,
        tools: req.body.tools,
        description: req.body.description,
        files,
    });

    console.log("project", project);

    project.save()
        .then(data => {
            res.json(data);
            return;
        })
        .catch(error => {
            res.json({error});
            return;
        });
})

router.delete('/:id', async (req, res) => {
    try {
        const info = await Project.deleteOne({ _id: req.params.id });
        await fsPromises.rm(`./assets/${req.params.id}`, {recursive: true, force: true});
        
        res.json(info);
        return;
    } catch (error) {
        res.json({error});
        return;
    }

});

const getCoverAndFiles = async (filesToUpload, prevFiles, uploadedCover, projectId) => {
    let filesRes;
    let coverRes; 
    
    if(filesToUpload) {
        if(filesToUpload.assetsToUpload)
            filesRes = await uploadFiles(projectId, filesToUpload.assetsToUpload);
        if(filesToUpload.coverToUpload) {
            // Rename file to "cover" 
            filesToUpload.coverToUpload.name = "cover." + filesToUpload.coverToUpload.name.split(".")[1];
            coverRes = await uploadFiles(projectId, [filesToUpload.coverToUpload]);
            console.log('coverRes: ', coverRes);
            coverRes = coverRes[0].path;
        }
    }

    
    let files = [];
    
    if(prevFiles) {
        let prevFilesFormatted = prevFiles; 
        
        if(Array.isArray(prevFilesFormatted)) prevFilesFormatted = prevFilesFormatted.map(file => JSON.parse(file));
        else prevFilesFormatted = [JSON.parse(prevFiles)];
        
        files.push(...prevFilesFormatted);
    }


    if(filesRes) files.push(...filesRes);
    
    const cover = coverRes ? coverRes : uploadedCover;

    return {cover, files}
}

router.patch('/:id', async (req, res) => {
    try {
        console.log("l.168 - req.body.files", req.body.files);
        const {cover, files} = await getCoverAndFiles(req.files, req.body.files, req.body.cover, req.params.id);

        console.log("l.171 - cover: ", cover);
        console.log("l.172 - files: ", files);

        const info = await Project.replaceOne({ _id: req.params.id }, {
            name: req.body.name,
            date: req.body.date,
            categories: req.body.categories,
            cover: cover,
            contributors: req.body.contributors,
            links: req.body.links,
            tools: req.body.tools,
            description: req.body.description,
            files: files,
        });
        console.log(info);
        res.json(info);
        return;

    } catch (error) {
        console.log("error: ", error);
        res.json({error});
        return;
    }
})

export default router;