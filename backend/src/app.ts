import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// GET /health → Health check endpoint
app.get("/health", (_, res) => {
    res.json({
        message: "health Check endpoint",
    });
});

// GET /api/tasks → Fetch all tasks with optional filtering
// POST /api/tasks → Create a new task
// PUT /api/tasks/:id → Update an existing task
// DELETE /api/tasks/:id → Delete a task
// GET /api/tasks/stats → Return task statistics
app.use("/api/tasks", (_, res) => {
    res.json({
        message: "This is the /api/tasks endpoint",
    });
});

export default app;
