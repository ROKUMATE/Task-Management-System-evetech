"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const task_controllers_1 = require("./controllers/task.controllers");
const logger_1 = __importDefault(require("./middleware/logger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
// GET /health → Health check endpoint
app.get("/health", task_controllers_1.healthCheck);
// GET /api/tasks → Fetch all tasks with optional filtering
// POST /api/tasks → Create a new task
// PUT /api/tasks/:id → Update an existing task
// DELETE /api/tasks/:id → Delete a task
// GET /api/tasks/stats → Return task statistics
app.use("/api/tasks", task_routes_1.default);
exports.default = app;
