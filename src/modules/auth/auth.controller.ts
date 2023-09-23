import {
  Controller,
  Post,
  Req,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../user/users.service'

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService) { }

  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: 'token expired',
  })
  @ApiBody({ type: CreateAuthDto })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req() req: any,
  ): Promise<object> {
    const tokens:any = await this.authService.login(req);
    return {
      status: 200,
      message: 'Authorization Successful',
      token: tokens.token,
    };
  }


  @ApiBody({ type: CreateAuthDto })
  @Post('auth/register')
  async signup(
    @Body() reqBody: CreateAuthDto
  ): Promise<object> {    
    reqBody.email = reqBody.email.toLowerCase();
    const tokens: any = await this.authService.signup(reqBody);
    if (tokens == null) {
      return {
        status: 400,
        message: 'Email Already Exist',
      };
    } else {
      return {
        status: 200,
        message: 'Registration Successful',
        access_token: tokens.token,
      };
    }
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req: any): Promise<object> {
    let res = {
      status: 200,
      message: 'Data not found',
      data: {},
    };
    const user = await this.usersService.findUserByEmail(req.user.email);
    if (user) {
      res.data = user;
      res.message = 'Data found';
    } else {
      res.status = 500;
    }
    return res;
  }
}
