import express from "express"
import http from "http";
import apiRoutes from "./api/v1/api.routes";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/config";

export class Server {
    public app: express.Application;
    server: http.Server
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.config();
        this.middlewares();
        this.routes();
    }
    config() {
        this.app.set("port", config.PORT);
        // MongoDB configuration
        mongoose.set("autoIndex", true)
        mongoose.set('strictQuery', true);
        mongoose.connect(config.DB.URI).then(db  => console.log("Connected to MongoDB")).catch(err => console.error("Error connectando a MongoDB"));
        
    }
    middlewares() {// Server middleware configuration
        this.app.use(express.json())
        this.app.use(express.urlencoded({ "extended": false }))
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

    }
    routes() {
        this.app.use(apiRoutes)
    }
    start() {
        this.server.listen(this.app.get("port"), () => {
            console.log("Server on port:", this.app.get("port"))
        })
    }
}
const server = new Server()
server.start()
