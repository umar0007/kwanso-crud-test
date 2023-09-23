import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Users } from '../schema/users.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Users> {
    email = email.toLowerCase();
    const user = await this.authService.validateUser(email, password);
    if (user === 'Incorrect password') {
      throw new UnauthorizedException('Incorrect password');
    } else if (user === 'Email not found') {
      throw new UnauthorizedException('Email not found');
    }

    delete user.password;
    return user;
  }
}