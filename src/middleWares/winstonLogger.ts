import * as winston from "winston";
import {Application} from 'express';
import {LoggerInstance,transports} from "winston";
var winstonLogger:LoggerInstance=new winston.Logger({
    transports:[
        new transports.Console({
            colorize:true
            ,timestamp:new Date().toLocaleTimeString(),
            prettyPrint:true,
            handleExceptions:true,
            humanReadableUnhandledException:true
        }),
        new transports.File({filename:"server.log"})  
    ]
});
//
winstonLogger.handleExceptions(new transports.File({filename:"exceptions.log"}));
process.on("unhandledRejection",(reason,p)=>{
    winstonLogger.warn("Possibly Unhandled Rejection at :",p,"reason",reason);
})
export default winstonLogger;