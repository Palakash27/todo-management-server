import Task from "../models/Task.js";

const TaskController = {
    // Create a new task
    createTask: async (req, res) => {
        try {
            const { title, description, status } = req.body;
            const task = new Task({
                title,
                description,
                status,
                createdBy: req.user._id,
            });
            const newTask = await task.save();
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all tasks for a user
    getAllTasks: async (req, res) => {
        try {
            let tasks;
            tasks = await Task.find({ createdBy: req.user._id });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a task by ID
    getTaskById: async (req, res) => {
        try {
            const task = await Task.findOne({
                _id: req.params.taskId,
                createdBy: req.user._id,
            });
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a task by ID
    updateTask: async (req, res) => {
        try {
            const { title, description, status } = req.body;
            const updatedTask = await Task.findOneAndUpdate(
                { _id: req.params.taskId, createdBy: req.user._id },
                { title, description, status },
                { new: true }
            );
            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a task by ID
    deleteTask: async (req, res) => {
        try {
            const deletedTask = await Task.findOneAndDelete({
                _id: req.params.taskId,
                createdBy: req.user._id,
            });
            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default TaskController;
