import * as socket_io from 'socket.io';

import App from '../app';
import {authorized, statusUser, userOffline} from './libs/middlewares';
import {Server} from 'http';
import {SocketMk} from '../interfaces/Socket';
import * as sharedSession from 'express-socket.io-session';
import {messageModel} from "../models/message";
import {channelModel} from "../models/channel";
import {isMember} from "./libs/helpers";


export function initialSocket(server: Server) {
    const io: socket_io.Server = socket_io(server);
    io.use(sharedSession(App.sessionInstance, {autoSave: true}));
    io.use(authorized());
    io.use(statusUser());

    io.on('connection', (socket: socket_io.Socket & SocketMk) => {
        console.info(socket.user.username, 'online');
        channelModel.model.find({members:socket.user._id})
            .then((channels)=>{
                socket.join(channels.map(channel=>channel.name));
            });
        socket.on('message', async function (message_form) {
            message_form.createdBy = socket.user.username;
            let channel = await channelModel.model.findOne({name: message_form.channel}).populate('members');
            if(!channel){
                console.log(message_form.channel,'not found');
                return ;
            }
            if (isMember(socket.user.username, channel)) {
                messageModel.model.create({
                    content: message_form.content,
                    type: message_form.type,
                    channel: channel._id,
                    createdBy: socket.user._id
                });
                io.to(channel.name).emit('listen_message', message_form);
            } else {
                console.log(socket.user.username, 'send message to room which he is not a member');
                socket.disconnect();
            }

        });
        userOffline(socket);
    });
}
