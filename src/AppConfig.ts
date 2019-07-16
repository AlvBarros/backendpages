import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Routes } from './routes/Routes';
import { Controllers } from './controllers/Controllers';

class AppConfig {
    public app: express.Application;
    public router: Routes = new Routes();
    public controllers: Controllers = new Controllers();
    public port: 3000;

    constructor() {
        this.app = express();
        this.config();
        //this.router.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));

        this.initializeControllers();
        this.initializeServer();
    }

    private initializeControllers(): void {
        this.controllers.all().forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }

    private initializeServer(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
          });
    }
}

export default new AppConfig().app;