import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { JoinRoomDTO } from '../auth/common/guard/types/socket.types';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { PrismaService } from 'src/lib/prisma.service';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway({
  cors: true, transports: ['websocket', "polling"],
})
export class GatewayGateway {
  constructor(private readonly gatewayService: GatewayService,
        private readonly prisma: PrismaService
  ) { }
  @WebSocketServer()
server!: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;


  private socketUsers = new Map();
  afterInit(server) {
    console.log('Gateway initialized');
  }
  handleConnection(data: JoinRoomDTO, client: Socket) {
    if(!data.streamId || !data.userId) throw new WsException("Invalid data");
    client.join(data.streamId);
const user = this.prisma.user.findUnique({
  where: {
    id: data.userId
  },

  select: {
       id: true,
        avatarUrl: true,
        name: true,
  }
})
 if (!user) throw new WsException("User Not Found.")
  client.join(data.streamId);
    this.socketUsers.set(client.id, {socketId: client.id, roomId: data.streamId, userId: data.userId, client: client,
      


    });


    // this.server.emit("test", "hello")
    console.log("Someone connected to server")
    return {
      success: true,
      message: "Connected to server",
      roomId: data.streamId,
      userId: data.userId
    }

  }
  handleDisconnect(client: Socket) {
    this.socketUsers.delete(client.id);
    console.log("Someone disconnected from server")
  }

  @SubscribeMessage('chat:message')
  handleMessage(client: Socket, payload: any) {

    const clientData = this.socketUsers.get(client.id);

   if (!clientData) throw new WsException("Invalid Data, steamId or userId is required to join.");
  
     this.gatewayService.handleMessage(this.server, payload, clientData);

}}