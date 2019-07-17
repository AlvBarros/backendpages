import * as http from "http";
import * as WebSocket from "ws";

export class SocketService {
    private app = require("express")();
    private server = http.createServer(this.app);
    private wss = new WebSocket.Server({ server: this.server });

    constructor() {
        console.log("Initializing socket service...");
        this.wss.on("connection", (ws: WebSocket) => {
            ws.on("message", (message: string) => {
                console.log(`recieved: "${message}"`);
                ws.send(`Hello, you sent "${message}"`);
            });
            ws.send("Hi there, I am a WebSocket server");
        });

        this.server.listen(3000, () => {
            console.log(`Server started on port ${3000} :)`);
        });
    }
}

export default SocketService;
// https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
