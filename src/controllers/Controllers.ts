import { TestController } from "./TestController";

import Controller from "../classes/Controller";

export class Controllers {
    private controllers: Controller[] = [
        new TestController()
    ];

    public all(): Controller[] {
        return this.controllers;
    }
}
