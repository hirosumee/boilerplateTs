import { NextFunction } from "express";
import { SocketMk } from "../../../interfaces/Socket";
import { userModel } from "../../../models/user";
import socketUser from "../users";

export function authorized(){
    return async (socket: SocketIO.Socket & SocketMk, next: NextFunction): Promise<void> => {
        const userID = socket.handshake.session.passport ? socket.handshake.session.passport.user : undefined;

        if (!userID) {
            return next('UnAuthorized');
        }
        try {
            const user = await userModel.model.findById(userID);
            if (user) {
                socket.user = user;
            } else {
                throw new Error('UnAuthorized');
            }
        } catch (error) {
            return next(error);
        }

        next();
    }
}
export function statusUser(){
    return async (socket:SocketIO.Socket& SocketMk,next:NextFunction):Promise<void>=>{
        socketUser.setUserOnline(socket.user.username,socket.id);
        next();
    }
}

export function userOffline(socket:SocketIO.Socket&SocketMk){
    socket.on('disconnect',(reason):void=>{
        socketUser.removeSocket(socket.user.username,socket.id);
        console.log(socket.user.username,'offline with reason :',reason);
    })
    
}