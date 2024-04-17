import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is requiredi"],
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: {
            values: ["To Do", "In Progress", "Done"],
            message:
                "{VALUE} is not a supported status. Please enter either 'To Do', 'In Progress', or 'Done'.",
        },
        default: "To Do",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default mongoose.model("Task", taskSchema);
