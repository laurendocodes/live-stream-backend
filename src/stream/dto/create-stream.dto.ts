
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStreamDto {
    @ApiProperty()
    @IsString()
    title!: string;
    @ApiProperty()
    @IsString()
    description!: string;
    @ApiProperty()
    @IsString()
    coverImageUrl!: string;
}