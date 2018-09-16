import { NextFunction } from "express";
import { SocketMk } from "../../../interfaces/Socket";
import { userModel } from "../../../models/user";
import socketsUser from "../users";

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
            return next(error.message);
        }

        next();
    }
}
export function statusUser(){
    return (socket:SocketIO.Socket& SocketMk,next:NextFunction):void=>{
        socketsUser.setUserOnline(socket.user.username,socket.id);
        next();
    }
}

export function userOffline(socket:SocketIO.Socket&SocketMk){
    socket.on('disconnect',(reason):void=>{
        socketsUser.removeSocket(socket.user.username,socket.id);
        console.log(socket.user.username,'offline with reason :',reason);
    })
    
}