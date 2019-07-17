import { ChatSocket } from "../sockets/ChatSocket";

import Socket from "../classes/Socket";

export class Sockets {
    private sockets: Socket[] = [
        new ChatSocket()
    ];

    constructor() {
        // this.sockets.forEach((socket) => {
        //     socket.initialize();
        // });
    }

    public all(): Socket[] {
        return this.sockets;
    }
}
