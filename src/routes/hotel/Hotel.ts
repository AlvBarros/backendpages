import express = require("express");

import Controller from "../../templates/Controller";
import Route from "../../templates/Route";

import HotelFactory from "../../factories/HotelFactory";
import RouteFactory from "../../factories/RouteFactory";
import UserFactory from "../../factories/UserFactory";

import { HotelDTO } from "../../entities/hotel/HotelDTO";
import UserDTO from "../../entities/account/UserDTO";

import Authorization from "../../middlewares/Authorization";

import Authentication from "../../services/security/Authenticator";

// import Profiles from "../../entities/profiles/profiles.json";

export class Hotel extends Controller {
    public path: string = "hotel";
    public readonly router = express.Router();
    public readonly routeFactory = new RouteFactory();
    public readonly hotelFactory = new HotelFactory();
    public readonly userFactory = new UserFactory();
    public readonly userDTO = new UserDTO();
    public readonly hotelDTO = new HotelDTO();
    public authorization = new Authorization();
    public authentication = new Authentication();

    public register: Route = this.routeFactory.createRouteWithMiddlewares("POST", "register",
    [this.authorization], async (request: express.Request, response: express.Response) => {
        try {
            const hotel = this.hotelFactory.generateHotelFromRequest(request.body);
            const token = this.authentication.getTokenFromHeader(request.headers);
            this.authentication.verify(token).then((email) => {
                this.userDTO.queryByEmail(email).then((user) => { 
                    this.userDTO.registerHotel(user, hotel).then((result) => {
                        if (result) {
                            response.statusCode = 200;
                            response.json({ success: "Success!"});
                        } else {
                            throw new Error("Failed to insert hotel.");
                        }
                    }).catch((err) => { throw err; })
                }).catch((err) => { throw err; })
            }).catch((err) => { throw err; })
        } catch (err) {
            response.statusCode = 500;
            response.json({ error: err.message });
        }
    });

    public routes: Route[] = [
        this.register
    ];
}
export default Hotel;
