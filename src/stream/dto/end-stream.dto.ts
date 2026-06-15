
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EndStreamDto {
    @ApiProperty()
    @IsString()
    streamKey!: string;
   
}