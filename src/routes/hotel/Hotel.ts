import express = require("express");

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import HotelFactory from "../../factories/HotelFactory";
import RouteFactory from "../../factories/RouteFactory";

import { HotelDTO } from "../../entities/hotel/HotelDTO";
import Authorization from "../../middlewares/Authorization";
import Authentication from "../../services/security/Authenticator";

// import Profiles from "../../entities/profiles/profiles.json";

export class Hotel extends Controller {
    public path: string = "hotel";
    public readonly router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public readonly dto = new HotelDTO();
    public readonly hotelFactory = new HotelFactory();
    public authorization = new Authorization();
    public authentication = new Authentication();

    public register: Route = this.routeFactory.createRouteWithMiddlewares("POST", "register",
    [this.authorization], async (request: express.Request, response: express.Response) => {
        try {
            const hotel = this.hotelFactory.createHotelFromRequest(request.body);
            this.dto.insert(hotel).then((result) => {
                if (result) {
                    response.statusCode = 200;
                    response.json({ success: "Success!"});
                } else {
                    throw new Error("Failed to insert hotel.");
                }
            }).catch((err) => {
                throw err;
            });
        } catch (err) {
            response.json({ error: err.message });
        }
    });

    public routes: Route[] = [
        this.register
    ];
}
export default Hotel;
