import { PrismaService } from 'src/lib/prisma.service';

import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { EndStreamDto } from './dto/end-stream.dto';

@Injectable()
export class StreamService {
  constructor(private readonly prismaService: PrismaService) { }

  async getStreams() {
    const streams = await this.prismaService.stream.findMany({
      where: {}
    })
    return streams;
  }

  async createStream(userId: string) {
    const streamer = await this.prismaService.user.count({
      where: { id: userId }
    })
    if (!streamer) throw new BadRequestException("Streamer Not Found.")
    const streamKey = this.createCustomUniqueString(["stream", "live", "video", "streaming"])
    const streamUrl = `http://localhost/hls/${streamKey}.m3u8`

    const streams = await this.prismaService.stream.create({
      data: {
        streamerId: userId,
        streamKey,
        streamUrl,
      }
    })

    return streams;
  }

  async ends(userId: string, dto: EndStreamDto) {
    const streamer = await this.prismaService.user.count({
      where: { id: userId }
    })
    if (!streamer) throw new BadRequestException("Streamer Not Found.")
    const stream = await this.prismaService.stream.findFirst({
      where: { streamerId: userId, streamKey: dto.streamKey, isActive: true }
    })
    if (!stream) throw new BadRequestException("Stream Not Found.")
    const endedStream = await this.prismaService.stream.update({
      where: { id: stream.id },
      data: {
        isActive: false,
        endedAt: new Date(),
        isEneded: true
      }
    })
    return endedStream;
  }

  async updateStream(userId: string,id:string, dto:UpdateStreamDto ) {
    const streamer = await this.prismaService.user.count({
      where: { id: userId }
    })
    if (!streamer) throw new BadRequestException("Streamer Not Found.")
    const stream = await this.prismaService.stream.findFirst({
      where: { streamerId: userId, isActive: true }
    })
    if (!stream) throw new BadRequestException("Stream Not Found.")
    const updatedStream = await this.prismaService.stream.update({
      where: { id: stream.id },
      data: {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl
      }
    })
    return updatedStream;
  }


  createCustomUniqueString(words: string[]): string {
    // 1. Define your custom alphabet/character pool
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "-_";

    // Combine them into one master pool
    const characterPool = lowercase + uppercase + numbers + symbols;

    // 2. Pick a couple of random words from your array
    const sampleSize = Math.min(2, words.length);
    const chosenWords: string[] = [];
    for (let i = 0; i < sampleSize; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      chosenWords.push(words[randomIndex]);
    }
    const baseString = chosenWords.join("-");

    // 3. Generate a unique suffix of a specific length (e.g., 8 characters)
    // using ONLY the character pool defined above
    const suffixLength = 8;
    let uniqueSuffix = "";

    for (let i = 0; i < suffixLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      uniqueSuffix += characterPool[randomIndex];
    }

    // 4. Combine your word base with the custom unique string
    return `${baseString}_${uniqueSuffix}`;
  }

}