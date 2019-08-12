import * as express from "express";

import Route from "./Route";

export class Controller {
    public path: string;
    public router: express.Router;
    public routes: Route[];

    public initializeRouter(): void {
        if (this.routes) {
            this.routes.forEach((route) => {
                if (route.httpMethod === "GET") {
                    this.router.get(route.path, async (req, res, next) => {
                        await Promise.resolve(route.function(req, res, next))
                            .then(next);
                    });
                } else if (route.httpMethod === "POST") {
                    this.router.post(route.path, async (req, res, next) => {
                        await Promise.resolve(route.function(req, res, next))
                            .then(next);
                    });
                }
            });
        }
    }
}
export default Controller;
