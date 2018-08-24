import IMy_Router from "../../interfaces/Router/IMy_Router";
import {Router,Request,Response} from "express";

class homeRouter implements IMy_Router{
    middlewareRegister(): void {
    }
    private router:Router;
    getRoute():Router {
        return this.router;
    }

    registerRouter():void {
        this.getRoute()
            .get('/',(request:Request,response:Response)=>{
                response.send('hahah');
            })
    }
    constructor(){
        this.router = Router();
        this.registerRouter();
    }
}

export default (new homeRouter());