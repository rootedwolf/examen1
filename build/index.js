"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const api_routes_1 = __importDefault(require("./api/v1/api.routes"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.config();
        this.middlewares();
        this.routes();
    }
    config() {
        this.app.set("port", config_1.default.PORT);
        // MongoDB configuration
        mongoose_1.default.set("autoIndex", true);
        mongoose_1.default.set('strictQuery', true);
        mongoose_1.default.connect(config_1.default.DB.URI).then(db => console.log("Connected to MongoDB")).catch(err => console.error("Error connectando a MongoDB"));
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ "extended": false }));
        this.app.use((0, cors_1.default)({
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }
    routes() {
        this.app.use(api_routes_1.default);
    }
    start() {
        this.server.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"));
        });
    }
}
exports.Server = Server;
const server = new Server();
server.start();
