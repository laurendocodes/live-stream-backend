
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SendMessageDTO } from 'src/auth/common/guard/types/socket.types';
import { PrismaService } from 'src/lib/prisma.service';

@Processor('comment', {concurrency: 5}) 
export class CommentProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  } 
   async process(job: Job<SendMessageDTO>): Promise<any> {
    const { userId, message, streamId } = job.data;
    const comment = await this.prisma.comment.create({
      data: {
        userId,
        message,
        streamId
      }
    })
    return { status: "ok", process: job.processedBy };
  }
}
