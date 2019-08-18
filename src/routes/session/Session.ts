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
            if (this.validateBody(request.body)) {
                this.userDTO.queryByEmail(request.body.email).then((result) => {
                    if (result) {
                        if (result.length === 1) {
                            const user = result[0];
                            if (user.email === request.body.email &&
                                user.password === request.body.password) {
                                    this.auth.generateToken(result[0]).then((token) => {
                                        response.json({ token });
                                    }).catch((err) => {
                                        console.log(err);
                                        response.json({ error: "Unable to find user." });
                                    });
                            } else {
                                throw new Error("Invalid credentials.");
                            }
                        } else if (result.length > 1) {
                            throw new Error("Multiple users found.");
                        } else if (result.length === 0) {
                            throw new Error("No user found.");
                        } else {
                            throw new Error("Unknown condition found.");
                        }
                    }
                }).catch((err) => { response.json({ error: err.message }); });
            } else {
                response.json({ error: "Invalid request body." });
            }
        }
    );

    public register: Route = this.routeFactory.createRoute("POST", "/register",
        async (request: express.Request, response: express.Response) => {
            const body = request.body;
            if (this.validateBody(body)) {
                this.userDTO.queryByEmail(body.email).then((result) => {
                    if (result) {
                        if (result.length === 0) {
                            const user = new User(body.name, body.email, body.profile, body.password);
                            this.userDTO.register(user).then((registered) => {
                                if (registered) {
                                    this.auth.generateToken(user).then((token) => {
                                        response.json({ token });
                                    }).catch((err) => {
                                        throw err;
                                    });
                                } else {
                                    throw new Error("Failed to register to database.");
                                }
                            });
                        } else {
                            throw new Error("E-mail already registered.");
                        }
                    }
                }).catch((err) => {
                    response.json({ error: err.message });
                });
            }
        }
    );

    public verifyToken: Route = this.routeFactory.createRoute("POST", "/verify",
        async (request: express.Request, response: express.Response) => {
            this.auth.verify(request.body.token).then((info) => {
                response.json({ success: "Token valid!" });
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

    public validateBody(body: { email: string, password: string }): boolean {
        return (!!body.email && !!body.password);
    }
}

export default Session;
