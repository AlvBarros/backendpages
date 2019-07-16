import * as express from "express";

export class Route {
    public httpMethod: string;
    public path: string;
    public function: any;

    constructor(m: string, p: string, f: any) {
        this.httpMethod = m;
        this.path = p;
        this.function = f;
    }
}

export default Route;
