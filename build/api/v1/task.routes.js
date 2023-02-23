"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = __importDefault(require("../../controllers/task"));
class TaskRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.taskController = new task_1.default();
        this.config();
    }
    config() {
        this.router.get("/", this.taskController.getTasks);
        this.router.get("/:id", this.taskController.getTask);
        this.router.delete("/:id", this.taskController.deleteTask);
        this.router.put("/:id", this.taskController.updateTask);
    }
}
exports.default = new TaskRoutes().router;
