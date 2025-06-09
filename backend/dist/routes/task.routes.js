"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controllers_1 = require("../controllers/task.controllers");
const router = (0, express_1.Router)();
// GET /api/tasks → Fetch all tasks with optional filtering
// POST /api/tasks → Create a new task
// PUT /api/tasks/:id → Update an existing task
// DELETE /api/tasks/:id → Delete a task
// GET /api/tasks/stats → Return task statistics
router.get("/", task_controllers_1.getAll);
router.post("/", task_controllers_1.create);
router.put("/:id", task_controllers_1.update);
router.delete("/:id", task_controllers_1.remove);
router.get("/stats", task_controllers_1.stats);
exports.default = router;
