import express from "express";
import { Project } from "./../models/Project.js";
import { Category } from "../models/Category.js";
import { Tool } from "../models/Tool.js";

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

    // const categories = await Promise.all(req.body.categories.map((name) => Category.find({ name }).exec()));
    // const tools = await Promise.all(req.body.tools.map(async (name) => await Tool.findOne({ name }).exec()));

    const project = new Project({
        name: req.body.name,
        date: req.body.date,
        categories: req.body.categories,
        cover: req.body.cover,
        contributors: req.body.contributors,
        links: req.body.links,
        tools: req.body.tools,
        description: req.body.description,
        files: req.body.files,
    });

    console.log(project);

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
        res.json(info);
        return;
    } catch (error) {
        res.json({error});
        return;
    }

});

router.patch('/:id', async (req, res) => {
    try {
        // const categories = req.body.categories && await Promise.all(req.body.categories.map((name) => Category.find({ name }).exec()));
        // const tools = req.body.tools && await Promise.all(req.body.tools.map(async (name) => await Tool.findOne({ name }).exec()));

        const info = await Project.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            date: req.body.date,
            categories: req.body.categories,
            cover: req.body.cover,
            contributors: req.body.contributors,
            links: req.body.links,
            tools: req.body.tools,
            description: req.body.description,
            files: req.body.files,
        });

        console.log(info);
        res.json(info);
        return;

    } catch (error) {
        res.json({error});
        return;
    }
})

export default router;