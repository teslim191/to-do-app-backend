import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
})
export default mongoose.model("Task",TaskSchema)
