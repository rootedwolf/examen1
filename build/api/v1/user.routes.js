"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../controllers/user"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_1.default();
        this.config();
    }
    config() {
        this.router.get("/", this.userController.getAll);
        this.router.post("/", this.userController.create);
        this.router.post("/:id/tasks", this.userController.addTask);
        this.router.get("/:id/tasks", this.userController.getTasks);
        this.router.get("/:id/tasks/:status?/:date?", this.userController.getTasksByStatusAndDate);
    }
}
exports.default = new UserRoutes().router;
