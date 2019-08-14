import * as express from "express";
import jwt = require('jsonwebtoken');

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import User from "../../entities/user/User";

import RouteFactory from "../../factories/RouteFactory";

export class Session extends Controller {
    public path: string = "session";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();

    public login: Route = this.routeFactory.createRoute("POST", "/login",
        async (request: express.Request, response: express.Response) => {
            //Mock user
            const usr = new User('Mock', 'mock@gmail.com', 'Admin');
            jwt.sign({ user: usr }, 'secret', (err, token) => {
                response.statusCode = 200;
                response.json({ token });
            });
            response.send("Test successful!");
        });

    public routes: Route[] = [
        this.login
    ];
}

export default Session;
