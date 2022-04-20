import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const Tool = mongoose.model("Tool", ToolSchema);

export { Tool, ToolSchema }