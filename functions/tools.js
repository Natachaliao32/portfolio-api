var express = require("express");
var { Tool } = require("../models/Tool.js");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tools = await Tool.find({});
        res.json(tools);
    } catch (error) {
        res.json({error});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);
        res.json(tool);
    } catch (error) {
        res.json({error});
    }
})

router.post('/', (req, res) => {
    const tool = new Tool({
        name : req.body.name
    })

    console.log(req.body);

    tool.save()
    .then(data => res.json(data))
    .catch(error => res.json({error}));
})

router.delete('/:id', async (req, res) => {
    try {
        const info = await Tool.deleteOne({_id: req.params.id});
        res.json(info);
    } catch (error) {
        res.json({error});
    }
})

module.exports.router = router;