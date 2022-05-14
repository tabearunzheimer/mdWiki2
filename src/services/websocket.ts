import { Server, ServerOptions } from "socket.io";

export class WS {

    private io;

    constructor(server: Partial<ServerOptions>) {
        this.io = new Server(server);
        this.io.on("connection", socket => {
            console.info("Client connected")
        })
        this.io.on("disconnect", socket => {
            console.info("Client disconnected")
        })
    }

    sendUpdateRequest() {
        this.io.emit("update", "Detected file changes... please reload website")
    }
}

