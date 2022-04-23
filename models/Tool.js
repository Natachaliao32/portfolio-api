var mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const Tool = mongoose.model("Tool", ToolSchema);

module.exports = { Tool, ToolSchema }