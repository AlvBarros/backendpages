import { NextFunction, response } from "express";
import { Middleware } from "../../business/templates/Middleware";
import { Authenticator } from "../services/security/Authenticator";

export class Authorization extends Middleware {

    public ProccessRequest(req: any, res: any, next: NextFunction): void {
        if (!req.headers.authorization || req.headers.authorization.split("Bearer ").length !== 2) {
            throw new Error("Must be authenticated.");
        } else {
            new Authenticator().verify(req.headers.authorization.split("Bearer ")[1]).then((result) => {
                if (result) {
                    next();
                } else {
                    throw new Error("Invalid token.");
                }
            }).catch((err) => {
                throw err;
                // next(err);
            });
        }
    }
}
export default Authorization;
