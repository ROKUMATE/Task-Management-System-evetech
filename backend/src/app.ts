import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { healthCheck } from "./controllers/task.controllers";
import logger from "./middleware/logger";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

// GET /health → Health check endpoint
app.get("/health", healthCheck);

// GET /api/tasks → Fetch all tasks with optional filtering
// POST /api/tasks → Create a new task
// PUT /api/tasks/:id → Update an existing task
// DELETE /api/tasks/:id → Delete a task
// GET /api/tasks/stats → Return task statistics
app.use("/api/tasks", taskRoutes);

export default app;
