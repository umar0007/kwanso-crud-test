import { UsersService } from '../../user/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly authService: AuthService,
    readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'osdfoa*B7%&&B^F&TC%' || process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<object> {
    log(payload);
    const user = await this.usersService.findUserByEmail(
      payload.email
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      email: user.email,
    };
  }
}
