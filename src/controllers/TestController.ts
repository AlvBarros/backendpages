import * as express from 'express';

import Controller from '../classes/Controller';

export class TestController implements Controller {
    public path: string = '/test';
    public router: express.Router = new express.Router();
}