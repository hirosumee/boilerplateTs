import {iRouter} from "../../interfaces/Router/IMy_Router";

class UserRouter extends iRouter{
    constructor() {
        super();
    }
    registerRouter():UserRouter{
        return this;
    }
}

export  default new UserRouter();