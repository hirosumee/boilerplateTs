import {NextFunction} from "express";
import {Request, Response} from "express-serve-static-core";

import winstonLogger from "../middleWares/winstonLogger";
import {iRouter} from "../interfaces/Router/IMy_Router";
import HttpError from "../libraries/Classes/Libraries_Classes_Error";

import homeRouter from './home';
import userRouter from './user';
import fileRouter from './file';


class RouterLoader extends iRouter {

    constructor() {
        super();
        this
            .use('/', homeRouter.getRoute())
            .use('/user',userRouter.getRoute())
            .use('/file',fileRouter.getRoute())
            //error catch
            .middlewareRegister((req: Request, res: Response, next: NextFunction) => {
                // 404 catch
                let error = new HttpError("Not Found");
                error.status = 404;
                next(error);
            })
            .middlewareRegister((err: any, req: Request, res: Response, next: NextFunction): any => {
                //catch and handle error
                let code = err.status || 500;
                winstonLogger.error(req.url);
                winstonLogger.error(err);
                res.status(code);
                if (process.env.NODE_ENV === 'Development') {
                    res.json({
                        errors: {
                            message: err.message,
                            error: err
                        }
                    });
                } else {
                    res.json({
                        errors: {
                            message: err.message
                        }
                    });
                }
                next();
            });
    }
}


export default new RouterLoader();
