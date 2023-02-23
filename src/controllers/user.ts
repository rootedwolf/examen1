import { Request, Response } from "express";
import UserSchema from '../schemas/user.schema';
import TaskSchema from '../schemas/task.schema';

export default class UserController {
    async getAll(req: Request, res: Response) {
        try {
            const users = await UserSchema.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error getting users', error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { username, fullName } = req.body;
            const newUser = new UserSchema({ username, fullName });
            const user = await newUser.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
    async addTask(req: Request, res: Response) {
        // we get the user id and then if the user exists we create a new task and save it
        const user = await UserSchema.findById(req.params.id)
        if (user) {
            const { title, description, status } = req.body
            const newTask = new TaskSchema({
                user: user._id,
                title: title,
                description: description,
                status: status
            })
            await newTask.save()
            res.status(200).json(newTask)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    async getTasks(req: Request, res: Response) {
        // we get the user id and then if the user exists we get all the tasks that belong to that user
        const user = await UserSchema.findById(req.params.id)
        if (user) {
            const tasks = await TaskSchema.find({ user: user._id })
            res.status(200).json(tasks)
        }
        else{
            res.status(404).json({ message: 'No tasks' })
        }
    }
    async getTasksByStatusAndDate(req: Request, res: Response) {
        const userId = req.params.id;
        const { status, date } = req.query;
      
        let tasks = await TaskSchema.find({ user: userId });
      
        if (status) {
          tasks = tasks.filter(task => task.status === status);
        }
        res.status(200).json(tasks);
    }
}
