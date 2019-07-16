import * as express from "express";

import Controller from "../classes/Controller";
import Route from "../classes/Route";

import RouteFactory from "../factories/RouteFactory";

export class TestController extends Controller {
    public path: string = "/test";
    public router = express.Router();

    public test: Route = new RouteFactory().createRoute("GET", "/",
        (request: express.Request, response: express.Response) => {
            response.send("Test successful!");
        });

    public test2: Route = new RouteFactory().createRoute("POST", "/",
        (request: express.Request, response: express.Response) => {
            response.send("Test 2 successful!");
        });

    public routes: Route[] = [
        this.test, this.test2
    ];
}

export default TestController;
