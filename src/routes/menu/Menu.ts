import express = require("express");

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import RouteFactory from "../../factories/RouteFactory";

import Authorization from "../../middlewares/Authorization";

import Authentication from "../../services/security/Authenticator";

import UserDTO from "../../entities/account/UserDTO";
import Profiles from "../../entities/profiles/profiles.json";
import UserFactory from "../../factories/UserFactory";

export class Menu extends Controller {
    public path: string = "menu";
    public readonly router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public authorization = new Authorization();
    public authentication = new Authentication();

    public menu: Route = this.routeFactory.createRouteWithMiddlewares("GET", "",
    [this.authorization], async (request: express.Request, response: express.Response) => {
        try {
            new UserFactory().generateUserFromRequestHeader(request.headers).then((user) => {
                response.json({
                    name: user.name || "",
                    profile: user.profile || Profiles.default,
                    profilePicture: user.profilePicture || ""
                });
            }).catch((err) => {
                throw err;
            });
        } catch (err) {
            response.json({ error: err.message });
        }
    });

    public routes: Route[] = [
        this.menu
    ];
}

export default Menu;
