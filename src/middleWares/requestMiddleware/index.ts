import {NextFunction, Request, Response} from "express";
function loginRequired(request:Request,response:Response,next:NextFunction) {
    if(request.isAuthenticated()){
        return next();
    }
    response.send({status:'error',message:'login required'});
}
export {loginRequired};