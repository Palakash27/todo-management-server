import express from "express";
import TaskController from "../controllers/taskController.js";
const router = express.Router();

// POST /tasks - Create a new task
router.post("/task/", TaskController.createTask);

// GET /tasks - Get all tasks or filter tasks by status
router.get("/task/", TaskController.getAllTasks);

// GET /tasks/:taskId - Get a task by ID
router.get("/task/:taskId", TaskController.getTaskById);

// PUT /tasks/:taskId - Update a task by ID
router.put("/task/:taskId", TaskController.updateTask);

// DELETE /tasks/:taskId - Delete a task by ID
router.delete("/task/:taskId", TaskController.deleteTask);

export default router;
