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
class UserController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_schema_1.default.find();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Error getting users', error });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, fullName } = req.body;
                const newUser = new user_schema_1.default({ username, fullName });
                const user = yield newUser.save();
                res.status(201).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating user', error });
            }
        });
    }
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // we get the user id and then if the user exists we create a new task and save it
            const user = yield user_schema_1.default.findById(req.params.id);
            if (user) {
                const { title, description, status } = req.body;
                const newTask = new task_schema_1.default({
                    user: user._id,
                    title: title,
                    description: description,
                    status: status
                });
                yield newTask.save();
                res.status(200).json(newTask);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // we get the user id and then if the user exists we get all the tasks that belong to that user
            const user = yield user_schema_1.default.findById(req.params.id);
            if (user) {
                const tasks = yield task_schema_1.default.find({ user: user._id });
                res.status(200).json(tasks);
            }
            else {
                res.status(404).json({ message: 'No tasks' });
            }
        });
    }
    getTasksByStatusAndDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const { status, date } = req.query;
            let tasks = yield task_schema_1.default.find({ user: userId });
            if (status) {
                tasks = tasks.filter(task => task.status === status);
            }
            if (date) {
                tasks = tasks.filter(task => task.createdAt.toDateString() === new Date(date).toDateString());
            }
            res.status(200).json(tasks);
        });
    }
}
exports.default = UserController;
