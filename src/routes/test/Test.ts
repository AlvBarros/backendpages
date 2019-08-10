import * as express from "express";

import Controller from "../../configuration/template/Controller";
import Route from "../../configuration/template/Route";

import RouteFactory from "../../configuration/template/facotries/RouteFactory";

export class Test extends Controller {
    public path: string = "test";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();

    public test: Route = this.routeFactory.createRoute("GET", "/",
        (request: express.Request, response: express.Response) => {
            response.send("Test successful!");
        });

    public test2: Route = this.routeFactory.createRoute("POST", "/",
        (request: express.Request, response: express.Response) => {
            response.send("Test 2 successful!");
        });

    public routes: Route[] = [
        this.test, this.test2
    ];
}

export default Test;
