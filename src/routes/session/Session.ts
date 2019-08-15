import * as express from "express";

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import User from "../../entities/account/User";

import { UserDTO } from "../../entities/account/UserDTO";
import RouteFactory from "../../factories/RouteFactory";
import Authenticator from "../../services/security/Authenticator";

export class Session extends Controller {
    public path: string = "session";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public auth: Authenticator = new Authenticator();
public userDTO: UserDTO = new UserDTO();

    public login: Route = this.routeFactory.createRoute("POST", "/login",
        async (request: express.Request, response: express.Response) => {
            const usr = this.userDTO.find(request.body.email, request.body.password);
            this.auth.generateToken(usr).then((token) => {
                response.json({ token });
            });
        }
    );

    public register: Route = this.routeFactory.createRoute("POST", "/register",
        async (request: express.Request, response: express.Response) => {
            response.send("Not yet implemented.");
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
