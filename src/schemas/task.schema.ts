import { model, Schema } from "mongoose";
import { iTaskSchema } from "../models/interfaces/task.interface";

const TaskSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref:'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});

TaskSchema.pre("save", function(next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export default model<iTaskSchema>("Task", TaskSchema);