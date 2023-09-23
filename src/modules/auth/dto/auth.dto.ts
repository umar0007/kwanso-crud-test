import {IsNotEmpty, IsEmail, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAuthDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

}