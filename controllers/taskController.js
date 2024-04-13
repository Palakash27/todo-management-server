import Task from "../models/Task.js";

const TaskController = {
    // Create a new task
    createTask: async (req, res) => {
        try {
            const { title, description, status } = req.body;
            const task = new Task({ title, description, status });
            const newTask = await task.save();
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all tasks or filter tasks by status
    getAllTasks: async (req, res) => {
        try {
            let tasks;
            if (req.query.status) {
                tasks = await Task.find({ status: req.query.status });
            } else {
                tasks = await Task.find();
            }
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a task by ID
    getTaskById: async (req, res) => {
        try {
            const task = await Task.findById(req.params.taskId);
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
            const updatedTask = await Task.findByIdAndUpdate(
                req.params.taskId,
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
            const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
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
