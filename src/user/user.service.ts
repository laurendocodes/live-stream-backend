import { Injectable } from '@nestjs/common';
import { stat } from 'fs';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllUsers() {
        const users = await this.prismaService.user.findMany({
            where: {},
            select: {
                id: true,
                name: true,
                email: true,
               avatarUrl: true,
                isActive: true,
            }
        })
        return {
            status: 200,
            message: 'Users retrieved successfully',
            data: users,
        }
 
    }

 

}
