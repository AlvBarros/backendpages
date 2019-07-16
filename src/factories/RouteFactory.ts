import Route from "../classes/Route";

export class RouteFactory {
    public createRoute(httpMethod: string, path: string, func: any) {
        return new Route(httpMethod, path, func);
    }
}

export default RouteFactory;
