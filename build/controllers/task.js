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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const task_schema_1 = __importDefault(require("../schemas/task.schema"));
class TaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findById(req.params.id);
                if (user) {
                    const { title, description, status } = req.body;
                    const newTask = new task_schema_1.default({
                        user: user._id,
                        title: title,
                        description: description,
                        status: status
                    });
                    const task = yield newTask.save();
                    res.status(201).json(task);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating task', error });
            }
        });
    }
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findById(req.params.id);
                if (user) {
                    const tasks = yield task_schema_1.default.find({ user: user._id });
                    res.json(tasks);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error getting tasks', error });
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            task_schema_1.default.find({})
                .then(tasks => res.json(tasks))
                .catch(err => res.status(500).json({ message: 'Error getting tasks', error: err }));
        });
    }
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            task_schema_1.default.findById(req.params.id)
                .then(task => res.json(task))
                .catch(err => res.status(500).json({ message: 'Error getting task', error: err }));
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            task_schema_1.default.findByIdAndRemove(req.params.id)
                .then(() => res.json({ status: 'Task Deleted' }))
                .catch(err => res.status(500).json({ message: 'Error deleting task', error: err }));
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // we update the status of the task
            task_schema_1.default.findByIdAndUpdate(req.params.id, req.body)
                .then(() => res.json({ status: 'Task Updated' }))
                .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
        });
    }
}
exports.default = TaskController;
