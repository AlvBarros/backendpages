import * as express from "express";

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import { TestDTO } from "../../entities/test/TestDTO";
import RouteFactory from "../../factories/RouteFactory";

export class Test extends Controller {
    public path: string = "test";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public readonly testDTO = new TestDTO();

    public test: Route = this.routeFactory.createRoute("GET", "/",
        async (request: express.Request, response: express.Response) => {
            response.statusCode = 200;
            response.send("Test successful!");
        });

    public test2: Route = this.routeFactory.createRoute("POST", "/",
        async (request: express.Request, response: express.Response) => {
            response.statusCode = 200;
            response.send("Test 2 successful!");
        });

    public test3: Route = this.routeFactory.createRoute("GET", "/error",
        async (request: express.Request, response: express.Response) => {
            response.statusCode = 500;
            response.send({ error: "Error test!"});
        });

    public testInsert: Route = this.routeFactory.createRoute("POST", "/insert",
        async (request: express.Request, response: express.Response) => {
            await this.testDTO.insert(request.body)
            .then((result) => {
                response.send(result);
            });
        });

    public routes: Route[] = [
        this.test, this.test2, this.test3, this.testInsert
    ];
}

export default Test;
