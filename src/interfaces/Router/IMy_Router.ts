import { Router} from 'express';
import {RequestHandlerParams} from "express-serve-static-core";

interface IMy_Router{
    getRoute():Router;
    registerRouter():any;
    middlewareRegister(func:RequestHandlerParams):any;
}

export default IMy_Router;