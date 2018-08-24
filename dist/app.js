"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = require("body-parser");
const logger = require("morgan");
const winstonLogger_1 = require("./middleWares/winstonLogger");
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const routers_1 = require("./routers");
class App {
    constructor() {
        this.environmentHost = process.env.NODE_EVN || "Development";
        this.app = express();
        this.configure();
    }
    configure() {
        //connect mongoose
        mongoose.Promise = global.Promise;
        mongoose_1.connect("mongodb://hirosume:cuong299@ds012578.mlab.com:12578/chatbot")
            .then(() => {
            this.mongooseConnection = mongoose.connection;
            winstonLogger_1.default.info("Mongoose connection!!");
        })
            .catch((error) => {
            winstonLogger_1.default.error(`Mongoose orcur a error: ${error}`);
        });
        //body parser middleware config
        this.app.use(body_parser_1.json());
        this.app.use(body_parser_1.urlencoded({
            extended: false,
            limit: "5mb",
            parameterLimit: 5000
        }));
        this.app.use(routers_1.default.getRoute());
        //Morgan middleware
        this.environmentHost === "Development" ?
            this.app.use(logger("combined"))
            : this.app.use(logger("common"));
    }
}
exports.default = new App();
