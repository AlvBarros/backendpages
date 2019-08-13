import { NextFunction } from "express";

export class Middleware {
    public path: string = "";
    public priority: number = 0;

    public ProccessRequest(req: any, res: any, next: NextFunction): void { /* do nothing */ }
}
export default Middleware;
