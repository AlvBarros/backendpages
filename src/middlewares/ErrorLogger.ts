import { Middleware } from "../configuration/template/Middleware";

import { NextFunction } from "express";
import { Logger } from "../services/logger/Logger";

export class ErrorLogger extends Middleware {
    public logger: Logger = new Logger();

    public   ProccessRequest(req: any, res: any, next: NextFunction): void {

            res.on("finish", function() {
                if (res.statusCode !== 200) {
                    this.logger.LogText([ // << "this" is the response, so no logger
                        {
                            color: this.logger.Red,
                            text: `ERROR: ${req.method ? req.method : "?"}:${req.path ? req.path : "?"}`
                        },
                        {
                            color: this.logger.White,
                            text: this.message
                        }
                    ]);
                }
            });
            next();
    }
}
export default ErrorLogger;
