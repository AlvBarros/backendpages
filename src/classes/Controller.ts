import * as express from "express";

import Route from "./Route";

export class Controller {
    public path: string;
    public router: express.Router;
    public routes: Route[];

}
export default Controller;
