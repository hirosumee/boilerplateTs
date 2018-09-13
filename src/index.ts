import App from './app';
import * as http from 'http';
import winstonLogger from './middleWares/winstonLogger';
import { initialSocket } from './socket.io';

const port: number | string | boolean = normalizePort(process.env.PORT);

const server: http.Server = http.createServer(App.app);

initialSocket(server);

server.listen(port);
server.on(
    'listening',
    (): void => {
        winstonLogger.info('Server is running on port :' + port);
    }
);
server.on(
    'error',
    (): void => {
        winstonLogger.error('Server orcur a error!!');
    }
);

function normalizePort(param: number | string): number | string | boolean {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
    else return false;
}
