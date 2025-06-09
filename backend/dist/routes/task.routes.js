"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controllers_1 = require("../controllers/task.controllers");
const router = (0, express_1.Router)();
router.get("/", task_controllers_1.getAll);
router.post("/", task_controllers_1.create);
//@ts-ignore
router.put("/:id", task_controllers_1.update);
//@ts-ignore
router.delete("/:id", task_controllers_1.remove);
router.get("/stats", task_controllers_1.stats);
exports.default = router;
