import {Request, Response} from "express";
import * as bcrypt from "bcrypt";
import * as passport from "passport";

import {iRouter} from "../../interfaces/Router/IMy_Router";
import {userModel} from "../../models/user";

import {loginRequired} from "../../middleWares/requestMiddleware";

class UserRouter extends iRouter {
    constructor() {
        super();
    }

    registerRouter(): UserRouter {
        this.getRoute()
            .get('/', loginRequired, async (req: Request, res: Response) => {
                res.status(200).send(await userModel.model.find({}));
            })
            .post('/', async (req: Request, res: Response) => {
                let {username, password} = req.body;
                try {
                    let data = await userModel.model.create({username, password: bcrypt.hashSync(password, 5)});
                    res.status(200).send(data);
                } catch (e) {
                    res.status(500).send({status: 'error'});
                }
            })
            .post('/login', passport.authenticate('local', {
                successRedirect: '/user',
                failureRedirect: '/'
            }))
            .get('/logout', (req: Request, res: Response) => {
                req.logout();
                res.redirect('/')
            })
            .get('/register', function (req: Request, res: Response) {
                res.send(
                    '<form method="post" action="/user">' +
                    '<input name="username" type="text">' +
                    '<input name="password" type="password">' +
                    '<input type="submit" value="register">' +
                    '</form>')
            });
        return this;
    }
}

export default new UserRouter();