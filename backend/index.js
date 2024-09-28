import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary";
dotenv.config();

import { connectDB } from "./config/db.js"

import userRouter from "./routes/userRoute.js"
import imageRoute from "./routes/imageRoutes.js"
import path from 'path';
const app = express();

// app.use(cors({
//     origin: [process.env.ORIGIN],
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     credentials: true
// }));

const __dirname = path.resolve();



cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", userRouter)
app.use("/api/images", imageRoute)


app.use(express.static(path.join(__dirname, './frontend/dist')));
// app.use(express.static(path.join(__dirname, './frontend')));
app.use((req, res, next) => {
    if (req.url.endsWith('.jsx') || req.url.endsWith('.js')) {
        res.contentType('application/javascript');
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    res.sendFile(path.join(__dirname, 'frontend', "dist", 'index.html'));
})

app.use('/js', express.static(path.join(__dirname, '/frontend/dist/js'), {
    // Set content type explicitly to application/javascript
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));


const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`server listening on port ${port}`);

    } catch (error) {
        console.log("internal server error: " + error.message);
    }
})


