import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class StreamService {
constructor(private readonly prismaService:PrismaService) {}
async getStreams() {
    const streams = await this.prismaService.stream.findMany({
where: {}
    });}


}
