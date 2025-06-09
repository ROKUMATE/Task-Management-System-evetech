// Task Schema:
// {
// _id: ObjectId,
// title: String (required, min: 3 chars, max: 100 chars),
// description: String (optional, max: 500 chars),
// status: String (required, enum: ['pending', 'in-progress', 'completed']),
// priority: String (required, enum: ['low', 'medium', 'high']),
// createdAt: Date (auto-generated),
// updatedAt: Date (auto-updated),
// dueDate: Date (optional)
// }

import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        title: { type: String, required: true, minlength: 3, maxlength: 100 },
        description: { type: String, maxlength: 500 },
        status: {
            type: String,
            required: true,
            enum: ["pending", "in-progress", "completed"],
        },
        priority: {
            type: String,
            required: true,
            enum: ["low", "medium", "high"],
        },
        dueDate: Date,
    },
    { timestamps: true }
);

export const Task = model("Task", taskSchema);
