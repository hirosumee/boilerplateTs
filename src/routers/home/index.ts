import {iRouter} from "../../interfaces/Router/IMy_Router";
import {Router, Request, Response, RequestHandler} from "express";

class homeRouter extends iRouter{

    registerRouter():any {
        this.getRoute()
            .get('/',(request:Request,response:Response)=>{
                response.send('hahah');
            });
        return this;
    }
    constructor(){
        super();
    }
}

export default (new homeRouter());