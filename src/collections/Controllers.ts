import { Menu } from "../routes/menu/Menu";
import { Session } from "../routes/session/Session";
import { Test } from "../routes/test/Test";

import Controller from "../templates/Controller";

export class Controllers {
    private controllers: Controller[] = [
        new Test(), new Session(), new Menu()
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
