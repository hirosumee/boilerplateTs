"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const winstonLogger_1 = require("./middleWares/winstonLogger");
const port = normalizePort(process.env.PORT);
const server = http.createServer(app_1.default.app);
server.listen(port);
server.on("listening", () => {
    winstonLogger_1.default.info("Server is running on port :" + port);
    //console.log("Server is running on port :"+port);
});
server.on("error", () => {
    winstonLogger_1.default.error("Server orcur a error!!");
    // console.log(
    //     "Server orcur a error !!!!"
    // );
});
function normalizePort(param) {
    const portNumber = typeof param === "string" ? parseInt(param, 10) : param;
    if (isNaN(portNumber))
        return param;
    else if (portNumber >= 0)
        return portNumber;
    else
        return false;
}
