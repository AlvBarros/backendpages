import Middleware from "../../business/templates/Middleware";
import Route from "../../business/templates/Route";

export class RouteFactory {
    public createRoute(httpMethod: string, path: string, func: any) {
        return new Route(httpMethod, "/" + path.replace("/", ""), func);
    }

    public createRouteWithMiddlewares(httpMethod: string, path: string, middlewares: Middleware[], func: any) {
        const route = new Route(httpMethod, "/" + path.replace("/", ""), func);
        route.setMiddlewares(middlewares);
        return route;
    }
}

export default RouteFactory;
