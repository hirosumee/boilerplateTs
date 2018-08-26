import { Router} from 'express';
import {PathParams, RequestHandlerParams} from "express-serve-static-core";

export interface IMy_Router{
    getRoute():Router;
    registerRouter():any;
    middlewareRegister(func:RequestHandlerParams):any;
}
export abstract class iRouter implements IMy_Router{
    protected router:Router;
    getRoute(): Router {
        return this.router;
    }

    middlewareRegister(func: RequestHandlerParams): iRouter {
        this.getRoute()
            .use(func);
        return this;
    }

    registerRouter(): iRouter {
        return this;
    }

    use(path: PathParams, route: Router): iRouter {
        this.router.use(path, route);
        return this;
    }
    protected constructor(){
        this.router = Router();
        this.registerRouter();
    }
}