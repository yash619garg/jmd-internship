import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 }
}, { timestamps: true })


const image = mongoose.model("Image", imageSchema);
export default image;