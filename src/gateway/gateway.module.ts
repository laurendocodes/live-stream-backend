import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { BullModule } from '@nestjs/bullmq';
import { CommentProcessor } from './processors/comment.processor';
@Module({
  imports: [  BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "comment"
    })

  
  ],

  providers: [GatewayGateway, GatewayService,CommentProcessor],

})
export class GatewayModule {



}
