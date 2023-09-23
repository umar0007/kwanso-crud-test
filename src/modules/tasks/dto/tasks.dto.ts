import {IsNotEmpty, IsEmail, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTaskDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

}