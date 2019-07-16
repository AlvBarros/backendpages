import * as bodyParser from "body-parser";
import express = require("express");

import { Controllers } from "./controllers/Controllers";
import { Routes } from "./routes/Routes";

class AppConfig {
    public app: express.Application;
    public router: Routes = new Routes();
    public controllers: Controllers = new Controllers();
    public port: number = 3000;

    constructor() {
        this.app = express();
        this.config();
        // this.router.routes(this.app);
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
            controller.routes.forEach((route) => {
                this.app.use(controller.path + route.path, route.function);
            });
        });
    }

    private initializeServer(): void {
        this.initializeControllers();
        this.app.use("/api", (req, res) => {
            res.send("Connected!");
        });
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
          });
    }
}

export default AppConfig;
