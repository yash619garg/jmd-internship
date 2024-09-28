import express from 'express';
const router = express.Router();

import { getUserDetails, login, logout, register } from '../controller/userController.js';
import { authorization } from '../middleware/authorization.js';
// import { singleUpload } from '../middleware/multer.js';


router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/logout").post(authorization, logout)
router.route("/getUser").get(authorization, getUserDetails);


export default router;