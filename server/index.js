import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config(); // This line allows us to pull in variables from our .env file

const app = express();
// Middleware -----------------------------------
app.use(cors());
app.use(express.json({ limit: "50mb" }));

    // API endpoints
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
// Routes ---------------------------------------
app.get("/", async (req, res) => {
    res.send("Hello from DALL-E!");
});

// Start Server ---------------------------------
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server is listening on port http://localhost:8080"));
    } catch (error) {
        console.log(error);
    }
};

startServer();