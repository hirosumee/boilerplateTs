import * as socket_io from 'socket.io';

import App from '../app';
import { authorized, statusUser, userOffline} from './libs/middlewares';
import { Server } from 'http';
import { SocketMk } from '../interfaces/Socket';
import * as sharedSession from 'express-socket.io-session';


export function initialSocket(server: Server) {
    const io: socket_io.Server = socket_io(server);
    io.use(sharedSession(App.sessionInstance, { autoSave: true }));
    io.use(authorized());
    io.use(statusUser());

    io.on('connection', (socket: socket_io.Socket & SocketMk) => {
        console.info(socket.user.username, 'online');
        socket.join('Communication');
        socket.on('message',function (message_form) {
            message_form.sender = socket.user.username;
            io.to('Communication').emit('listen_message',message_form);
        });
        userOffline(socket);
    });
}
