import { Middleware } from "../templates/Middleware";

import { NextFunction } from "express";
import { Logger } from "../services/logger/Logger";

export class Authorization extends Middleware {
    public ProccessRequest(req: any, res: any, next: NextFunction): void {
        console.log("Authorization middleware");
        next();
    }
}
export default Authorization;
