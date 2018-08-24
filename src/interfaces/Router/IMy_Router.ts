import {Router} from 'express';

interface IMy_Router{
    getRoute():Router;
    registerRouter():void;
    middlewareRegister():void;
}

export default IMy_Router;