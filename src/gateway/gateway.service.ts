import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketMapUsers } from 'src/auth/common/guard/types/socket.types';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from 'src/lib/prisma.service';
@Injectable()
export class GatewayService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('comment') private readonly commentQueue: Queue
  ) { }
    handleMessage(server: Server,data: any,clientData: SocketMapUsers) {
        this.commentQueue.add('comment', data);
        server.to(clientData.roomId).emit("chat:message", {id: clientData.userId, message: data.message,name:clientData.name,
avatarUrl: clientData.avatarUrl,
roomId:clientData.roomId,


        });
      
          }
    
}
