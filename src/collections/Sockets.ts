import { ChatSocket } from "../routes/chat/Chat";

import Socket from "../templates/Socket";

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
