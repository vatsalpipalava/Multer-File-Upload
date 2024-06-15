// server.js
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:6690"],
  credentials: true
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

app.get("/api/v1/serverCheck/ping", (req, res) => {
    res.json({ ping: "server is running on 5000" });
});

app.post("/api/v1/images/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send("No file uploaded.");
    }
    const fileUrl = `${process.env.ASSETS_URL}/uploads/${file.filename}`;
    res.json({ url: fileUrl });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`Image storage server running on port ${port}`);
});
