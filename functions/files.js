import express from "express";
import { existsSync, mkdirSync, unlink } from "fs";
import { changeName } from "../utils/index.js";
import { Project } from "./../models/Project.js";

const router = express.Router();

router.post('/upload', async (req, res) => {

    // Upload files
    
    let filesRes;
    let coverRes; 
    console.log('req.files: ', req.files);
    if(req.files) {
        if(req.files.filesToUpload)
            filesRes = await uploadFiles(id, req.files.filesToUpload);
        if(req.files.coverToUpload) {
            // Rename file to "cover" 
            req.files.coverToUpload.name = "cover." + req.files.coverToUpload.name.split(".")[1];
            coverRes = await uploadFiles(id, [req.files.coverToUpload]);
            console.log('coverRes', coverRes);
            coverRes = coverRes[0].path;
        }
        res.json({files: filesRes, cover: coverRes});
        return;
    }
    else {
        res.json({error: "No files to add."}); 
        return;
    }
})

router.post('/dummy', (req, res) => {
    res.json({message: "ok"})
    return;
})

router.delete('/', (req, res) => {
    console.log("delete", req.body.filesPath);
    if(req.body.filesPath) {
        req.body.filesPath.forEach(path => {
            unlink(`./assets/${path}`, (error) => {  
            if (error) {
                console.error(error); 
                return;
            }
            else {
                console.log(`${path} was deleted.`);
                return;
            }
            });
        })
    }
    else {
        res.json({message: "Rien à supprimer"});
        return;
    }
})

export default router;