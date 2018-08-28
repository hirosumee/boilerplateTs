import * as express from "express";
import {Application} from "express";
import {json, urlencoded} from "body-parser";
import * as logger from "morgan";
import {Mongoose, Connection, connect} from 'mongoose';
import * as mongoose from "mongoose";
import {MongoError} from "mongodb";
import * as dotnv from "dotenv";
import * as errorHandler from "errorhandler";
import * as session from "express-session";
import * as config from "config";
import * as passport from "passport";

import RouterLoader from './routers';
import winstonLogger from "./middleWares/winstonLogger";
import passportLoader from "./middleWares/passportJs";

dotnv.config();

class App {
    public app: Application;
    private environmentHost: string = process.env.NODE_EVN || "Development";
    public  mongooseConnection: Connection;

    constructor() {
        this.app = express();
        this.configure();
    }

    private configure(): void {

        passportLoader();
        //connect mongoose
        (mongoose as Mongoose).Promise = global.Promise;
        connect(process.env.DB_CONNECTION)
            .then(() => {
                //mongooseConnection is useful when we want to use native mongodb
                this.mongooseConnection = mongoose.connection;
                winstonLogger.info("Mongoose connection!!");
            })
            .catch((error: MongoError) => {
                winstonLogger.error(`Mongoose occurred a error: ${error}`);
            });
        //Morgan middleware
        this.environmentHost === "Development" ?
            this.app.use(logger("combined"))
            : this.app.use(logger("common"));

        //static resource config
        this.app.use(express.static(__dirname + '/public'));
        //body parser middleware config
        this.app.use(json());
        this.app.use(urlencoded({
            extended: false,
            limit: "5mb",
            parameterLimit: 5000
        }));
        this.app.use(
            session(
                {
                    secret: config.get("session.secret"),
                    cookie:
                        {
                            maxAge: 60000
                        },
                    resave: false,
                    saveUninitialized: false
                }
            )
        );
        // passport config
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        //error handler
        this.environmentHost === "Development" ? this.app.use(errorHandler()) : undefined;
        this.app.use(RouterLoader.getRoute());

    }
}

export default new App();