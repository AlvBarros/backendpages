import { TestController } from './TestController';

import Controller from '../classes/Controller'

export class Controllers {
    private controllers: Array<Controller> = [
        new TestController()
    ];

    public all(): Array<Controller> {
        return this.controllers;
    }

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        
    }
}