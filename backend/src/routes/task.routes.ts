import { Router, RequestHandler } from "express";
import {
    getAll,
    create,
    update,
    remove,
    stats,
} from "../controllers/task.controllers";

const router = Router();
// GET /api/tasks → Fetch all tasks with optional filtering
// POST /api/tasks → Create a new task
// PUT /api/tasks/:id → Update an existing task
// DELETE /api/tasks/:id → Delete a task
// GET /api/tasks/stats → Return task statistics
router.get("/", getAll as RequestHandler);
router.post("/", create as RequestHandler);
router.put("/:id", update as RequestHandler);
router.delete("/:id", remove as RequestHandler);
router.get("/stats", stats as RequestHandler);

export default router;
