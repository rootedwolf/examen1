import { Router, Request, Response } from "express";
import userRoutes from "./user.routes";
import taskRoutes from "./task.routes";

class ApiRoutes {
    public router: Router = Router();
    
    constructor() {
        this.config();
    }

    config(): void {
        this.router.use("/users", userRoutes)
        this.router.use("/tasks", taskRoutes)
        
        
    }
}

export default new ApiRoutes().router;

