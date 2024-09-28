import { myError } from "../config/error.js";
import Image from "../models/imageModel.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { getDataUri } from "../utils/getDataUri.js";
import cloudinary from "cloudinary"


export const createImage = asyncHandler(async (req, res) => {
    const { imageUrl, title, description } = req.body;
    if (!imageUrl || !title || !description) {
        throw new myError("Please provide all inputs", 400);
    }
    const existingImage = await Image.findOne({ imageUrl });
    if (existingImage) {
        throw new myError("image already exist", 400);
    }
    const newImage = new Image({ imageUrl, title, description });
    await newImage.save();
    res.status(201).json({ message: "Image added successfully", data: { imageUrl, title, description } });

})

export const getAllImage = asyncHandler(async (req, res) => {
    const allImage = await Image.find().sort({createdAt : -1});
    res.status(201).json(allImage);
})

export const updateViews = asyncHandler(async(req,res)=>{
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
        throw new myError("image not found" , 404);
    }
    image.views = image.views + 1 ;
    image.save();
    res.status(201).json(image);
})

export const uploadImage = asyncHandler(async(req , res)=>{
    const file = req.file;
    const imageUri = getDataUri(file);
    const uploadImage = await cloudinary.v2.uploader.upload(imageUri.content);
    res.status(200).json({ url: uploadImage.secure_url, public_id: uploadImage.public_id });

})

// export const getAllImages = asyncHandler(async(req , res)=>{
    
// })