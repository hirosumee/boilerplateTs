import { Router } from 'express';
import { PathParams, RequestHandlerParams } from 'express-serve-static-core';

export interface IMy_Router {
    getRoute(): Router;
    registerRouter(): any;
    middlewareRegister(func: RequestHandlerParams): any;
}
export abstract class iRouter implements IMy_Router {
    protected router: Router;
    
    protected constructor() {
        this.router = Router();
        this.registerRouter();
    }

    public getRoute(): Router {
        return this.router;
    }

    public middlewareRegister(func: RequestHandlerParams): iRouter {
        this.getRoute().use(func);
        return this;
    }

    public registerRouter(): iRouter {
        return this;
    }

    public use(path: PathParams, route: Router): iRouter {
        this.router.use(path, route);
        return this;
    }
}
