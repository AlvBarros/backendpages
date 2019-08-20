import express = require("express");

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import RouteFactory from "../../factories/RouteFactory";
import Authorization from "../../middlewares/Authorization";
import Authentication from "../../services/security/Authenticator";

import Profiles from "../../entities/profiles/profiles.json";

export class Menu extends Controller {
    public path: string = "menu";
    public readonly router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public authorization = new Authorization();
    public authentication = new Authentication();

    public menu: Route = this.routeFactory.createRouteWithMiddlewares("GET", "",
    [this.authorization], async (request: express.Request, response: express.Response) => {
        try {
            const tokenHeader = request.header("authorization").split("Bearer ")[1];
            this.authentication.verify(tokenHeader).then((result) => {
                response.json({
                    name: result.name || "",
                    profile: result.profile || Profiles.default,
                    profilePicture: result.profilePicture || ""
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
