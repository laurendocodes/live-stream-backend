import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
    @ApiProperty({ example: 'user-id-123' })
    @IsString()
    userId!: string;    }
