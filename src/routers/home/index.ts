import IMy_Router from "../../interfaces/Router/IMy_Router";
import {Router, Request, Response, RequestHandler} from "express";

class homeRouter implements IMy_Router{
    middlewareRegister(func:RequestHandler): any {
        return this;
    }

    private router:Router;

    getRoute():Router {
        return this.router;
    }

    registerRouter():any {
        this.getRoute()
            .get('/',(request:Request,response:Response)=>{
                response.send('hahah');
            });
        return this;
    }
    constructor(){
        this.router = Router();
        this.registerRouter();
    }
}

export default (new homeRouter());