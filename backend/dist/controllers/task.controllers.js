"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = exports.stats = exports.remove = exports.update = exports.create = exports.getAll = void 0;
const Task_1 = require("../models/Task");
/**
 * Points to keep in mind
 * 1. Success Response
    {
        "success": true,
        "data": {...},
        "message": "Operation successful"
    }
 * 2. Error Response
    {
        "success": false,
        "error": "Error message",
        "details": "Additional error details"
    }
 */
/**
 * Sample Request Query Parameters for getAll:
    {
        "status": "pending",
        "priority": "high",
        "search": "homework"
    }
 */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, priority, search } = req.query;
    const filter = {};
    if (status)
        filter.status = status;
    if (priority)
        filter.priority = priority;
    if (search)
        filter.title = { $regex: search, $options: "i" };
    const tasks = yield Task_1.Task.find(filter);
    res.json({ success: true, data: tasks, message: "Fetched tasks" });
});
exports.getAll = getAll;
/**
 * Sample Request Body for create:
    {
        "title": "Complete Assignment",
        "description": "Finish the math assignment",
        "status": "pending",
        "priority": "high",
        "dueDate": "2023-06-10T00:00:00.000Z"
    }
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title || !status || !priority) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: title, status, priority",
        });
    }
    const task = yield Task_1.Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
    });
    res.status(201).json({
        success: true,
        data: task,
        message: "Created task",
    });
});
exports.create = create;
/**
 * Sample Request Body for update:
    {
        "title": "Update Assignment Title",
        "status": "completed"
    }
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title && !description && !status && !priority && !dueDate) {
        return res.status(400).json({
            success: false,
            message: "At least one field must be provided for update",
        });
    }
    const task = yield Task_1.Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!task)
        return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: task, message: "Updated task" });
});
exports.update = update;
/**
 * Here you have to mention the id of it thats it
 */
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.Task.findByIdAndDelete(req.params.id);
    if (!task)
        return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: null, message: "Deleted task" });
});
exports.remove = remove;
/**
 * No request body or parameters required for stats.
 */
const stats = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield Task_1.Task.countDocuments();
    const completed = yield Task_1.Task.countDocuments({ status: "completed" });
    const pending = yield Task_1.Task.countDocuments({ status: "pending" });
    res.json({
        success: true,
        data: { total, completed, pending },
        message: "Stats",
    });
});
exports.stats = stats;
/**
 * Health check endpoint to verify server is running.
 */
const healthCheck = (_req, res) => {
    res.json({ success: true, message: "OK" });
};
exports.healthCheck = healthCheck;
