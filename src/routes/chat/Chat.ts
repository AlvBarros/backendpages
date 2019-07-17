import * as WebSocket from "ws";

import Socket from "../../configuration/template/Socket";

export class ChatSocket extends Socket {
    public initialize = (wss: WebSocket.Server) => {
        wss.on("connection", (ws: WebSocket) => {
            ws.on("message", (message: string) => {
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                      client.send(message);
                    }
                });
            });
        });
    }
}

export default ChatSocket;
