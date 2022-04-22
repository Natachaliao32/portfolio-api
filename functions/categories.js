import express from "express";
import { Category } from "../models/Category.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.json({error});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category);
    } catch (error) {
        res.json({error});
    }
})

router.post('/', (req, res) => {
    const category = new Category({
        name: req.body.name
    })

    console.log(req.body);

    category.save()
        .then(data => res.json(data))
        .catch(err => res.json({error: err}));
})

router.delete('/:id', async (req, res) => {
    try {
        const info = await Category.deleteOne({ _id: req.params.id });
        res.json(info);
    } catch (error) {
        res.json({error});
    }
})

export default router;