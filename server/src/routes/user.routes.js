import { Router } from "express";
import { allUser, fileUpload } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/avatar-upload").post(upload.single("avatar"), fileUpload);
router.route("/users").get(allUser);

export default router;
