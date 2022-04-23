var mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    name: String
})

const Media = mongoose.model("Media", MediaSchema);

module.exports = { Media, MediaSchema }