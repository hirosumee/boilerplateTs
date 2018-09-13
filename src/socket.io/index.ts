import * as socket_io from 'socket.io';
import { Server } from 'http';
import App from '../app';
import * as sharedSession from 'express-socket.io-session';
import { NextFunction } from 'express-serve-static-core';
import { userModel } from '../models/user';
import { SocketMk } from '../interfaces/Socket';

export function initialSocket(server: Server) {
    const io: socket_io.Server = socket_io(server);
    io.use(sharedSession(App.sessionInstance, { autoSave: true }));
    io.use(
        async (socket: socket_io.Socket & SocketMk, next: NextFunction): Promise<void> => {
            const user_id = socket.handshake.session.passport ? socket.handshake.session.passport.user : undefined;

            if (!user_id) {
                return next('UnAuthorized');
            }
            try {
                const user = await userModel.model.findById(user_id);
                if (user) {
                    socket.user = user;
                } else {throw new Error('UnAuthorized');}
            } catch (error) {
                return next(error);
            }

            next();
        }
    );
    io.on('connection', (socket: socket_io.Socket & SocketMk) => {
        console.info(socket.id, 'connected');
        console.log(socket.user);
    });
}
