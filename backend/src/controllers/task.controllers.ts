import { Request, Response } from "express";
import { Task } from "../models/Task";

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
export const getAll = async (req: Request, res: Response) => {
    const { status, priority, search } = req.query;
    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };
    const tasks = await Task.find(filter);
    res.json({ success: true, data: tasks, message: "Fetched tasks" });
};

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
export const create = async (req: Request, res: Response) => {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title || !status || !priority) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: title, status, priority",
        });
    }
    const task = await Task.create({
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
};

/**
 * Sample Request Body for update:
    {
        "title": "Update Assignment Title",
        "status": "completed"
    }
 */
export const update = async (req: Request, res: Response) => {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title && !description && !status && !priority && !dueDate) {
        return res.status(400).json({
            success: false,
            message: "At least one field must be provided for update",
        });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!task)
        return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: task, message: "Updated task" });
};

/**
 * Here you have to mention the id of it thats it
 */
export const remove = async (req: Request, res: Response) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
        return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: null, message: "Deleted task" });
};

/**
 * No request body or parameters required for stats.
 */
export const stats = async (_req: Request, res: Response) => {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: "completed" });
    const pending = await Task.countDocuments({ status: "pending" });
    res.json({
        success: true,
        data: { total, completed, pending },
        message: "Stats",
    });
};

/**
 * Health check endpoint to verify server is running.
 */
export const healthCheck = (_req: Request, res: Response) => {
    res.json({ success: true, message: "OK" });
};
