import {iRouter} from "../../interfaces/Router/IMy_Router";
import * as multer from "multer";
import {NextFunction, Request, RequestHandler, Response} from "express";
import * as config from "config";
import {fileModel} from "../../models/file";
import * as status from "http-status";

const upload = multer(config.get('multer'));

class fileRouter extends iRouter {
    uploadMiddleWare: RequestHandler;

    registerRouter(): fileRouter {
        let that: fileRouter = this;
        this.getRoute()
            .post('/upload', function (req: Request, res: Response, next: NextFunction) {
                if (req.isAuthenticated()) {
                    that.uploadMiddleWare(req, res, async function (error) {
                        if (error) {
                            next(error);
                        } else {
                            const {originalname, encoding, mimetype, filename, size, path} = req.file;
                            const {password} = req.body;
                            const payload = {
                                originalname,
                                encoding,
                                mimetype,
                                filename,
                                size,
                                path,
                                owner: req.user._id,
                                requirepassword: !!password,
                                password: password
                            };

                            try {
                                await fileModel.model.create(payload);
                                res.status(status.ACCEPTED).json(payload);
                            } catch (e) {
                                next(e);
                            }

                        }
                    });
                } else {
                    res.status(status.UNAUTHORIZED).send({status: 'error', message: 'UnAuthorized'});
                }
            })
            .post('/load/:scope', async function (request: Request, response: Response, next: NextFunction) {
                switch (request.params.scope) {
                    case 'global': {
                        try {
                            let data = await fileModel.model.find({});
                            return response.send(data);
                        } catch (e) {
                            next(e);
                        }
                    }
                    case 'me': {
                        try {
                            let data = await fileModel.model.find({owner:request.user._id});
                            return response.send(data);
                        } catch (e) {
                            next(e);
                        }
                    }
                    default: {
                        return response.status(status.METHOD_NOT_ALLOWED).send({status: 'error', message: 'method is not allowed'});
                    }
                }
            })
            .post('/info/:id',async function (request:Request,response:Response,next:NextFunction) {
                //check this file is public . if no then check this user is its owner
            });
        return this;
    }

    constructor() {
        super();
        this.uploadMiddleWare = upload.single('fileupload');
    }

}

export default new fileRouter();