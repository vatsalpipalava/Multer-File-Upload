import { Router } from "express";
import { fileUpload } from "../controllers/fileupload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/avatar-upload").post(upload.single("avatar"), fileUpload);

export default router;
