import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';

import { DefaultEventsMap, Server } from 'socket.io';

@WebSocketGateway({
  cors: true, transports: ['websocket', "polling"],
})
export class GatewayGateway {
  constructor(private readonly gatewayService: GatewayService) { }
  @WebSocketServer()
server!: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  afterInit(server) {
    console.log('Gateway initialized');
  }
  handleConnection() {
    this.server.emit("test", "hello")
    console.log("Someone connected to server")

  }
  handleDisconnect() {
    console.log("Someone disconnected from server")
  }
}