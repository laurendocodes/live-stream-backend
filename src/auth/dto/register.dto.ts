import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, isString } from "class-validator";

export class RegisterDto {
        @ApiProperty({example : "John Doe"})
    @IsString()
    name!: string;
@ApiProperty({example : "Johndoe@gmail.com"})
@IsEmail()
    email!: string;
   @ApiProperty({example : "password123"})
   @IsString()
    password!: string;
    @ApiProperty({example : "John Doe"})
    @IsString()
    @IsOptional()
    avatarUrl?: string;

   @ApiProperty({example : "password123"})
   @IsString()
    bio!: string

    
}