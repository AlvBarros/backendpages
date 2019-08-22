import { Middleware } from "../../business/templates/Middleware";

import { NextFunction } from "express";
import { Logger } from "../services/logger/Logger";

export class ErrorLogger extends Middleware {
    public logger: Logger = new Logger();

    public ProccessRequest(req: any, res: any, next: NextFunction): void {
        const oldWrite = res.write;
        const oldEnd = res.end;
        const chunks = [];

        res.write = (...restArgs) => {
            chunks.push(Buffer.from(restArgs[0]));
            oldWrite.apply(res, restArgs);
        };

        res.end = (...restArgs) => {
            if (restArgs[0]) {
                chunks.push(Buffer.from(restArgs[0]));
            }
            if (res.statusCode === 500) {
                const logger = new Logger();
                logger.LogText([
                    {
                        color: logger.Red,
                        text: `ERROR: ${req.method ? req.method : "?"}:${req.path ? req.path : "?"}`
                    },
                    {
                        color: logger.White,
                        text: Buffer.concat(chunks).toString("utf8")
                    }
                ]);
            }
            oldEnd.apply(res, restArgs);
        };
        next();
    }
}
export default ErrorLogger;
