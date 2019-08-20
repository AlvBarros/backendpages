import express = require("express");

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import RouteFactory from "../../factories/RouteFactory";
import HotelFactory from "../../factories/HotelFactory";

import Authorization from "../../middlewares/Authorization";
import Authentication from "../../services/security/Authenticator";

//import Profiles from "../../entities/profiles/profiles.json";

export class Hotel extends Controller {
    public path: string = "hotel";
    public readonly router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public readonly hotelFactory = new HotelFactory();
    public authorization = new Authorization();
    public authentication = new Authentication();

    public create: Route = this.routeFactory.createRouteWithMiddlewares("POST", "create",
    [this.authorization], async (request: express.Request, response: express.Response) => {
        try {
            const hotel = this.hotelFactory.createHotelFromRequest(request.body);
            // TODO: HOTEL REGISTRATION
        } catch (err) {
            response.json({ error: err.message });
        }
    });
    
    public routes: Route[] = [
        this.create
    ];
}
export default Hotel