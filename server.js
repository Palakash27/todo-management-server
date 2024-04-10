import express from "express";
import colors from "colors";
import cors from "cors";
// import UserRoutes from "./routes/UserRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import router from "./routes/taskRoutes.js";

const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api", router);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(
    PORT,
    console.log(`Server running on http://localhost:${PORT}`.yellow.bold)
);