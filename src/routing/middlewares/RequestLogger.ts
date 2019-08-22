import { Middleware } from "../../business/templates/Middleware";

import { NextFunction } from "express";
import { Logger } from "../services/logger/Logger";

export class RequestLogger extends Middleware {
    public logger: Logger = new Logger();
    public priority: number = 10;

    public Format(num: number): string {
        return ("0" + num).slice(-2);
    }

    public ProccessRequest(req: any, res: any, next: NextFunction): void {
        const day = this.Format(new Date().getDate());
        const month = this.Format(new Date().getMonth() + 1);
        const year = new Date().getFullYear();
        const hours = this.Format(new Date().getHours());
        const minutes = this.Format(new Date().getMinutes());
        const seconds = this.Format(new Date().getSeconds());
        this.logger.LogOnOneLine([
            {
                color: this.logger.White,
                text: `[${day}/${month}/${year}] [${hours}:${minutes}:${seconds}]`
            },
            {
                color: this.logger.Yellow,
                text: ` [${req.method}:${req.path}]`
            }
        ]);
        next();
    }
}
export default RequestLogger;
