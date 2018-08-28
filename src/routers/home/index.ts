import {Request, Response} from "express";

import {iRouter} from "../../interfaces/Router/IMy_Router";
class HomeRouter extends iRouter{

    registerRouter():HomeRouter {
        this.getRoute()
            .get('/',(request:Request,response:Response)=>{
                response.send(
                    `is login :${request.isAuthenticated()?'true':'false'}`+
                    '<hr><a href="/user/logout">logout</a>'+
                    ' <a href="/user/register">register</a>'+
                    '<form method="post" action="/user/login">' +
                    '<input type="text" name="username">' +
                    '<input type="password" name="password">' +
                    '<input type="submit">'+
                    '</form>');
            });
        return this;
    }
    constructor(){
        super();
    }
}

export default (new HomeRouter());