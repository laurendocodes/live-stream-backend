import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

constructor(private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService

) {}
async verifyLogin(body:LoginDto) {
    const user = await this.prismaService.user.findUnique({
        where: {
            email: body.email,
        },
    });

    if (!user) {
       throw new BadRequestException('Invalid email or password');
    }
  const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid email or password');
    const userPayload = {id:user.id, email:user.email, name:user.name , isActive:user.isActive, };
  const  accesssToken = await this.jwtService.sign(userPayload);
    return {
        status: 200,
        message: 'Login successful',
        data: {
            access_token: accesssToken,
        },
    };



}

async createUser (body: RegisterDto){
    const isExisted = await this.prismaService.user.count({
        where: {
            email: body.email,
        },
    });
    if (isExisted) {
        throw new BadRequestException('Email already exists');
    }   
    const encrytedPassword = await bcrypt.hash(body.password, 10);

    const createdUser = await this.prismaService.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: encrytedPassword,
            avatarUrl: body.avatarUrl,
            bio: body.bio,
        },
    });
    return {
        status: 201,
        message: 'User created successfully',
        data: {
            createdUser,
            
        },
    };
    
}


async deleteUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new BadRequestException('User not found');
    }
    await this.prismaService.user.delete({
        where: {
            id: userId,
        },
    });
    return {
        status: 200,
        message: `User ${user.name} deleted successfully`,
    };



}
}

