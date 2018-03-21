import App from "./app";
import * as http from "http";
import winstonLogger from "./middleWares/winstonLogger";

const port = normalizePort(process.env.PORT ||3000);

const server=http.createServer(App.app);
server.listen(port);
server.on("listening",():void=>{
    winstonLogger.info("Server is running on port :"+port);
    //console.log("Server is running on port :"+port);
});
server.on("error",():void=>{
    winstonLogger.error("Server orcur a error!!");
    // console.log(
    //     "Server orcur a error !!!!"
    // );
});
 
function normalizePort(param: number | string): number | string | boolean {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
    else return false;
}