import { Router, Request, Response } from "express";
import UserSchema from '../../schemas/user.schema'
import TaskSchema from '../../schemas/task.schema'
import TaskController from "../../controllers/task";

class TaskRoutes{
    public router: Router = Router();
    private taskController: TaskController = new TaskController();
    constructor() {
        this.config();
    }

    config(): void {
    this.router.get("/", this.taskController.getTasks)
    this.router.get("/:id", this.taskController.getTask);
    this.router.delete("/:id", this.taskController.deleteTask);
    this.router.put("/:id", this.taskController.updateTask);
}
}

export default new TaskRoutes().router;