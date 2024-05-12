import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env",
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 6690, () => {
        console.log(`⚙️  Server is running on PORT : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGODB CONNECT FAILED !!!", err);
});