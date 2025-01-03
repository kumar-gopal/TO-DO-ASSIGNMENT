const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
