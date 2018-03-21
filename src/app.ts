import * as express from "express";
import {Application} from "express";
import {json,urlencoded} from "body-parser";
import * as logger from "morgan";
import winstonLogger from "./middleWares/winstonLogger";
import {Mongoose,Connection,connect} from 'mongoose';
import * as mongoose from "mongoose";
import { MongoError } from "mongodb";


class App{
    public app:Application;
    private environmentHost:string=process.env.NODE_EVN||"Development";
    public mongooseConnection:Connection;
    constructor(){
        this.app=express();
        this.configure();
    }
    private configure():void{
        //connect mongoose
        (mongoose as Mongoose).Promise=global.Promise;
        connect("mongodb://hirosume:cuong299@ds012578.mlab.com:12578/chatbot")
            .then(()=>{
                this.mongooseConnection=mongoose.connection;
                winstonLogger.info("Mongoose connection!!");
            })
            .catch((error:MongoError)=>{
                winstonLogger.error(`Mongoose orcur a error: ${error}`);
            })
        //body parser middleware config
        this.app.use(json());
        this.app.use(urlencoded({
            extended:false,
            limit:"5mb",
            parameterLimit:5000
        }));
        //Morgan middleware
        this.environmentHost==="Development"?
            this.app.use(logger("combined"))
            :this.app.use(logger("common"));

    }
}
export default new App();