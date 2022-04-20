import mongoose from "mongoose";
import { CategorySchema } from "./Category.js";
import { ToolSchema } from "./Tool.js";
import { MediaSchema } from "./Media.js";

const ProjectSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    date : {
        type: String,
        required: true,
    },
    categories : {
        type: [String],
        required: true,
    },
    cover : {
        type: String,
        required: true,
    },
    contributors : {
        type: [String],
        required: false,
    },
    links : {
        type: [String],
        required: false,
    },
    tools : {
        type: [String],
        required: false,
    },
    description : {
        type: String,
        required: true,
    },
    files : [{
        media :  {
            type: String
        },
        path: {
            type: String
        },
        external: {
            type: Boolean
        },
        required: false,
    }],

})

const Project = mongoose.model("Project", ProjectSchema);

export { Project, ProjectSchema }