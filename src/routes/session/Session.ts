import * as express from "express";

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import User from "../../entities/account/User";

import { UserDTO } from "../../entities/account/UserDTO";
import RouteFactory from "../../factories/RouteFactory";
import Authorization from "../../middlewares/Authorization";
import Authenticator from "../../services/security/Authenticator";

export class Session extends Controller {
    public path: string = "session";
    public router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public auth: Authenticator = new Authenticator();
    public autho: Authorization = new Authorization();
    public userDTO: UserDTO = new UserDTO();

    public login: Route = this.routeFactory.createRoute("POST", "/login",
        async (request: express.Request, response: express.Response) => {
            this.userDTO.queryByEmail(request.body.email).then((usr) => {
                console.log("session!");
                console.log(usr);
                this.auth.generateToken(usr).then((token) => {
                    response.json({ token });
                })
                .catch((err) => {
                    console.log(err);
                    response.json({ error: "Unable to find user." });
                });
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

    public testToken: Route = this.routeFactory.createRouteWithMiddlewares("GET", "/test",
        [this.autho], async (req, res) => {
            /* test route */
            res.send("tested.");
        });

    public routes: Route[] = [
        this.login, this.register, this.verifyToken, this.testToken
    ];
}

export default Session;
