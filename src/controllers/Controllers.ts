import { TestController } from "./TestController";

import Controller from "../classes/Controller";

export class Controllers {
    private controllers: Controller[] = [
        new TestController()
    ];

    constructor() {
        this.controllers.forEach((controller) => {
            controller.initializeRouter();
        });
    }

    public all(): Controller[] {
        return this.controllers;
    }
}
