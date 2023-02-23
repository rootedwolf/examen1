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
const express_1 = require("express");
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
class ApiRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Hello World!');
        });
        this.router.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield user_schema_1.default.find();
            res.json(users);
        }));
        this.router.post("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, fullName } = req.body;
            const newUser = new user_schema_1.default({ username, fullName });
            newUser.save((err) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(201).json({ message: "User created" });
            });
        }));
    }
}
exports.default = new ApiRoutes().router;
