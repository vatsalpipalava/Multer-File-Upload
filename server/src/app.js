import express from "express";
import cors from "cors";
import path from "path"

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use("/public", express.static(path.join("public")));

import fileuploadRouter from "./routes/fileupload.routes.js";

app.use("/api/v1/upload", fileuploadRouter);

export { app };
