import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
    name: String
})

const Media = mongoose.model("Media", MediaSchema);

export { Media, MediaSchema }