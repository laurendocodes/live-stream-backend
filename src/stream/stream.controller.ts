import { Controller, Get, Post, Req } from '@nestjs/common';
import type { ExpressRequest} from '../auth/common/guard/types/request.type';
import { StreamService } from './stream.service';
// import { ApiBearerAuth } from 'node_modules/@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}
 
  // @Get()
  // async getStreams() {
  //   return this.streamService.getStreams();
  // }
  @Post()
  async createStream(@Req() req: ExpressRequest) {
    // Express Request typing may not include `user` by default. Use any to access authenticated user.
    const userId = req.user.id
    const streams = await this.streamService.createStream(userId);
    return streams;
  }
}
