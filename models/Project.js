var mongoose = require("mongoose");
var { CategorySchema } = require("./Category.js");
var { ToolSchema } = require("./Tool.js");
var { MediaSchema } = require("./Media.js");

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

module.exports = { Project, ProjectSchema }