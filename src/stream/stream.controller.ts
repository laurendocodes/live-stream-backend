import { Controller, Get } from '@nestjs/common';
import { StreamService } from './stream.service';
// import { ApiBearerAuth } from 'node_modules/@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}
 
  @Get()
  async getStreams() {
    return this.streamService.getStreams();
  }
}
