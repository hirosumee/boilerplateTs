import { Request, Response } from 'express';

import { iRouter } from '../../interfaces/Router/IMy_Router';
import * as config from 'config';

class HomeRouter extends iRouter {
    registerRouter(): HomeRouter {
        this.getRoute().get('/', (request: Request, response: Response) => {
            response.render('index', {
                resources: config.get('resources'),
                isAuthenticated: request.isAuthenticated(),
                assets: config.get('assets'),
                user: request.user,
                title: 'Sim sim'
            });
        });
        return this;
    }

    constructor() {
        super();
    }
}

export default new HomeRouter();
