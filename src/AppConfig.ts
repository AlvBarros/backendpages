import * as bodyParser from "body-parser";
import express = require("express");
import * as http from "http";
import * as WebSocket from "ws";

import { Controllers } from "./configuration/Controllers";
import { Routes } from "./configuration/Routes";
import { Sockets } from "./configuration/Sockets";

class AppConfig {
    public app: express.Application;
    public router: express.Router;
    public controllers: Controllers = new Controllers();
    public sockets: Sockets = new Sockets();
    public port; public hostname;

    constructor() {
        const cfenv = require("cfenv");
        const appEnv = cfenv.getAppEnv();
        this.hostname = appEnv.host || "localhost";
        this.port = appEnv.port || 3000;
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

    private initializeControllers(): void {
        console.log("Initializing controllers...");
        this.controllers.all().forEach((controller) => {
            this.app.use(`/api${controller.path}`, controller.router);
        });
    }

    private initializeSockets(wss: WebSocket.Server): void {
        console.log("Initializing sockets...");
        this.sockets.all().forEach((socket) => {
            socket.initialize(wss);
        });
    }

    private initializeServer(): void {
        this.initializeControllers();
        // this.app.listen(this.port, () => {
        //     console.log(`App listening on the port ${this.port}`);
        //   });
        const server = http.createServer(this.app);
        const wss = new WebSocket.Server({ server });
        this.initializeSockets(wss);
        server.listen(this.port, this.hostname, () => {
            console.log(`Server started on ${this.hostname}:${this.port} :)`);
        });

    }
}

export default AppConfig;
