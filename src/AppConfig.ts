import * as bodyParser from "body-parser";
import express = require("express");
import * as http from "http";
import * as WebSocket from "ws";

import { Controllers } from "./routing/collections/Controllers";
import { Middlewares } from "./routing/collections/Middlewares";
import { Routes } from "./routing/collections/Routes";
import { Sockets } from "./routing/collections/Sockets";

import ErrorLogger from "./routing/middlewares/ErrorLogger";
import { Logger } from "./routing/services/logger/Logger";

class AppConfig {
    public app: express.Application;
    public router: express.Router;

    public controllers: Controllers = new Controllers();
    public sockets: Sockets = new Sockets();
    public middlewares: Middlewares = new Middlewares();

    public logger: Logger = new Logger();
    public enviroment: string;
    public port;
    public hostname;

    constructor(env: string = "prod") {
        this.enviroment = env;
        if (this.enviroment === "prod") {
            const cfenv = require("cfenv");
            const appEnv = cfenv.getAppEnv();
            this.hostname = appEnv.host;
            this.port = appEnv.port;
        } else if (this.enviroment === "dev") {
            this.hostname = "localhost";
            this.port = "6001";
        }
        this.app = express();
        this.router = express.Router();
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));

        this.initializeServer();
    }

    private initializeMiddlewares(): void {
        this.logger.Log({text: "Initializing middlewares..", color: this.logger.Yellow});
        this.middlewares.all().sort((a, b) => b.priority - a.priority).map((middleware) => {
            if (middleware.path === "") {
                this.app.use((req, res, next) => {
                    middleware.ProccessRequest(req, res, next);
                });
            } else {
                this.app.use(middleware.path, (req, res, next) => {
                    middleware.ProccessRequest(req, res, next);
                });
            }
        });
    }

    private initializeControllers(): void {
        this.logger.Log({text: "Initializing controllers..", color: this.logger.Yellow});
        this.controllers.all().map((controller) => {
            this.app.use(`/api/${controller.path}`, controller.router);
        });
    }

    private initializeSockets(wss: WebSocket.Server): void {
        this.logger.Log({text: "Initializing sockets..", color: this.logger.Yellow});
        this.sockets.all().map((socket) => {
            socket.initialize(wss);
        });
    }

    private initializeServer(): void {
        const server = http.createServer(this.app);
        const wss = new WebSocket.Server({ server });
        this.initializeSockets(wss);
        this.initializeMiddlewares();
        this.initializeControllers();
        server.listen(this.port, this.hostname, () => {
            this.logger.Log({ text: `Running on enviroment: ${this.enviroment}.`, color: this.logger.White });
            this.logger.Log({ text: `Server started on ${this.hostname}:${this.port} :)`, color: this.logger.Yellow });
        });

    }
}

export default AppConfig;
