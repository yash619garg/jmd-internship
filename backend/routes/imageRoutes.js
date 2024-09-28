import express from 'express';
const router = express.Router();


import { authorization } from '../middleware/authorization.js';
import { createImage, getAllImage, updateViews, uploadImage } from '../controller/imageController.js';
import { singleUpload } from '../middleware/multer.js';


router.route("/uploadImage").post(authorization, singleUpload, uploadImage);
router.route("/createImage").post(authorization, createImage);
router.route("/updateViews/:id").post(authorization, updateViews);
router.route("/getAllImage").get(authorization, getAllImage);



export default router;