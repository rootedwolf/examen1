
import { Request, Response } from 'express';
import UserSchema from '../schemas/user.schema';
import TaskSchema from '../schemas/task.schema';

export default class TaskController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserSchema.findById(req.params.id);
            if (user) {
                const { title, description, status } = req.body;
                const newTask = new TaskSchema({
                    user: user._id,
                    title: title,
                    description: description,
                    status: status
                });
                const task = await newTask.save();
                res.status(201).json(task);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    }

    async getByUserId(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserSchema.findById(req.params.id);
            if (user) {
                const tasks = await TaskSchema.find({ user: user._id });
                res.json(tasks);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error getting tasks', error });
        }
    }
    async getTasks(req: Request, res: Response): Promise<void> {
        TaskSchema.find({})
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).json({ message: 'Error getting tasks', error: err }));
    }
    async getTask(req: Request, res: Response): Promise<void> {
        TaskSchema.findById(req.params.id)
            .then(task => res.json(task))
            .catch(err => res.status(500).json({ message: 'Error getting task', error: err }));
    }
    async deleteTask(req: Request, res: Response): Promise<void> {
        TaskSchema.findByIdAndRemove(req.params.id)
            .then(() => res.json({ status: 'Task Deleted' }))
            .catch(err => res.status(500).json({ message: 'Error deleting task', error: err }));
    }
    async updateTask(req: Request, res: Response): Promise<void> {
        // we update the status of the task
        TaskSchema.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.json({ status: 'Task Updated' }))
            .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
    }
}