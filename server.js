import express from "express";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import TaskRouter from "./routes/TaskRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/tasks", TaskRouter);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(
    PORT,
    console.log(`Server running on http://localhost:${PORT}`.yellow.bold)
);
