import express from "express";
import TaskController from "../controllers/TaskController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// POST /tasks - Create a new task
router.route("/").post(protect, TaskController.createTask);

// GET /tasks - Get all tasks or filter tasks by status
router.route("/").get(protect, TaskController.getAllTasks);

// GET /tasks/:taskId - Get a task by ID
router.route("/:taskId").get(protect, TaskController.getTaskById);

// PUT /tasks/:taskId - Update a task by ID
router.route("/:taskId").put(protect, TaskController.updateTask);

// DELETE /tasks/:taskId - Delete a task by ID
router.route("/").delete(protect, TaskController.deleteTask);

export default router;
