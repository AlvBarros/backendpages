import { ErrorLogger } from "../middlewares/ErrorLogger";
import { RequestLogger } from "../middlewares/RequestLogger";

import Middleware from "../../business/templates/Middleware";

export class Middlewares {
    public middlewares: Middleware[] = [
        new ErrorLogger(), new RequestLogger()
    ];

    public all(): Middleware[] {
        return this.middlewares;
    }
}
