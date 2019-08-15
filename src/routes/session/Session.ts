import * as express from "express";

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import User from "../../entities/user/User";

import RouteFactory from "../../factories/RouteFactory";
import Authenticator from "../../services/security/Authenticator";

export class Session extends Controller {
    public path: string = "session";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public auth: Authenticator = new Authenticator();

    public login: Route = this.routeFactory.createRoute("POST", "/login",
        async (request: express.Request, response: express.Response) => {
            // Mock user
            const usr = new User("Mock", "mock@gmail.com", "Admin");
            this.auth.generateToken(usr).then((token) => {
                response.json({ token });
            });
        }
    );

    public verifyToken: Route = this.routeFactory.createRoute("POST", "/verify",
        async (request: express.Request, response: express.Response) => {
            this.auth.verify(request.body.token).then((info) => {
                response.json(info);
            });
        }
    );

    public routes: Route[] = [
        this.login, this.verifyToken
    ];
}

export default Session;
