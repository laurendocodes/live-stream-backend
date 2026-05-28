import { PrismaService } from 'src/lib/prisma.service';

import { BadRequestException, Injectable } from '@nestjs/common';

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