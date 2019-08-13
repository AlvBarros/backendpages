import { Test } from "../routes/test/Test";

import Controller from "../templates/Controller";

export class Controllers {
    private controllers: Controller[] = [
        new Test()
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
