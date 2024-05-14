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

import user from "./routes/user.routes.js";

app.use("/api/v1/auth", user);

export { app };
