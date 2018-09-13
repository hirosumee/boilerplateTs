"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const winston_1 = require("winston");
var winstonLogger = new winston.Logger({
    transports: [
        new winston_1.transports.Console({
            colorize: true,
            timestamp: new Date().toLocaleTimeString(),
            prettyPrint: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
        new winston_1.transports.File({ filename: 'server.log' })
    ]
});
//
winstonLogger.handleExceptions(new winston_1.transports.File({ filename: 'exceptions.log' }));
process.on('unhandledRejection', (reason, p) => {
    winstonLogger.warn('Possibly Unhandled Rejection at :', p, 'reason', reason);
});
exports.default = winstonLogger;
