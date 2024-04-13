import express from "express";
import TaskController from "../controllers/TaskController.js";
const router = express.Router();

// POST /tasks - Create a new task
router.post("/", TaskController.createTask);

// GET /tasks - Get all tasks or filter tasks by status
router.get("/", TaskController.getAllTasks);

// GET /tasks/:taskId - Get a task by ID
router.get("/:taskId", TaskController.getTaskById);

// PUT /tasks/:taskId - Update a task by ID
router.put("/:taskId", TaskController.updateTask);

// DELETE /tasks/:taskId - Delete a task by ID
router.delete("/:taskId", TaskController.deleteTask);

export default router;
