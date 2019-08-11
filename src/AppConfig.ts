import * as bodyParser from "body-parser";
import express = require("express");
import * as http from "http";
import * as WebSocket from "ws";

import { Controllers } from "./configuration/Controllers";
import { Middlewares } from "./configuration/Middlewares";
import { Routes } from "./configuration/Routes";
import { Sockets } from "./configuration/Sockets";

import ErrorLogger from "./middlewares/ErrorLogger";
import { Logger } from "./services/logger/Logger";

class AppConfig {
    public app: express.Application;
    public router: express.Router;

    public controllers: Controllers = new Controllers();
    public sockets: Sockets = new Sockets();
    public middlewares: Middlewares = new Middlewares();

    public logger: Logger = new Logger();
    public port; public hostname;

    constructor() {
        const cfenv = require("cfenv");
        const appEnv = cfenv.getAppEnv();
        this.hostname = appEnv.host;
        this.port = appEnv.port;
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
            console.log(`Server started on ${this.hostname}:${this.port} :)`);
        });

    }
}

export default AppConfig;
