import * as express from "express";
import Middleware from "./Middleware";

export class Route {
    public middlewares: Middleware[];
    public proccess: express.RequestHandler;
    public httpMethod: string;
    public path: string;
    public function: any;

    constructor(m: string, p: string, d: any) {
        this.httpMethod = m;
        this.path = p;
        this.proccess = d;
    }

    public setMiddlewares(middlewares: Middleware[]) {
        this.middlewares = middlewares;
    }

    public handlers() {
        const handlers = this.middlewares ? this.middlewares.map((m) => m.ProccessRequest) : [];
        handlers.push(this.proccess);
        return handlers;
    }
}

export default Route;
