import { Router, Request, Response } from "express";
import UserSchema from '../../schemas/user.schema'
import TaskSchema from '../../schemas/task.schema'
import UserController from "../../controllers/user";

class UserRoutes {
    public router: Router = Router();
    private userController: UserController = new UserController();
   
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", this.userController.getAll )
        this.router.post("/",this.userController.create);
        this.router.post("/:id/tasks", this.userController.addTask);
        this.router.get("/:id/tasks", this.userController.getTasks);
        this.router.get("/:id/tasks/:status?/:date?", this.userController.getTasksByStatusAndDate);
    }
}

export default new UserRoutes().router;