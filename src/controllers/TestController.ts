import * as express from "express";

import Controller from "../classes/Controller";
import Route from "../classes/Route";

import RouteFactory from "../factories/RouteFactory";

export class TestController extends Controller {
    public path: string = "/test";

    public test: Route = new RouteFactory().createRoute("GET", "/test",
        (request: express.Request, response: express.Response) => {
            console.log("teste"!);
            response.send("test controller");
        });

    public routes: Route[] = [ this.test ];
}
