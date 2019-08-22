import express = require("express");
import UserFactory from "../../../business/account/UserFactory";
import Profiles from "../../../business/profiles/profiles.json";
import Controller from "../../../business/templates/Controller";
import Route from "../../../business/templates/Route";
import RouteFactory from "../../../routing/controllers/RouteFactory";
import Authorization from "../../middlewares/Authorization";
import Authentication from "../../services/security/Authenticator";

export class Menu extends Controller {
    public path: string = "menu";
    public readonly router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public authorization = new Authorization();
    public authentication = new Authentication();

    public menu: Route = this.routeFactory.createRouteWithMiddlewares("GET", "",
    [this.authorization], async (request: express.Request, response: express.Response) => {
        try {
            console.log("menu");
            console.log(request.headers);
            new UserFactory().generateUserFromRequestHeader(request.headers).then((user) => {
                console.log(user);
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
