import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import TaskRouter from "./routes/TaskRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

colors.setTheme({
    silly: "rainbow",
    input: "grey",
    verbose: "cyan",
    prompt: "grey",
    info: "green",
    data: "grey",
    help: "cyan",
    warn: "yellow",
    debug: "blue",
    error: "red",
});

const app = express();
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

const PORT = process.env.PORT || 3001;
app.listen(
    PORT,
    console.log(`Server running on http://localhost:${PORT}`.warn)
);
