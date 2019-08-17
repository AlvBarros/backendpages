import Middleware from "../templates/Middleware";
import Route from "../templates/Route";

export class RouteFactory {
    public createRoute(httpMethod: string, path: string, func: any) {
        return new Route(httpMethod, path, func);
    }

    public createRouteWithMiddlewares(httpMethod: string, path: string, middlewares: Middleware[], func: any) {
        const route = new Route(httpMethod, path, func);
        console.log("setting middlewares " + middlewares.length);
        route.setMiddlewares(middlewares);
        return route;
    }
}

export default RouteFactory;
