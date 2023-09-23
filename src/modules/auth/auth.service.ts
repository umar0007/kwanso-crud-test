import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import * as process from "process";
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async validateUser(email: string, pass: string): Promise<any> {
    const user:any = await this.usersService.findUserByEmail(email);
    if (!user) {
      return 'Email not found';
    } else if (user && (await bcrypt.compare(pass, user.password ?? ''))) {
      return user;
    } else {
      return 'Incorrect password';
    }
  }

  async login(data: any): Promise<object> {
    const user = data.user;

    const payload = await this.payload(user);

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public static async hashPassword(password: string): Promise<string> {
    // Generating new hashed password to save in database
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async signup(
    reqBody: any
  ): Promise<object> {
    try {
      let userData = reqBody;
      const email = await this.usersService.findUserByEmail(
        userData.email,
      );
      if (email) {
        return null;
      }

      userData.password = await AuthService.hashPassword(userData.password);

      const user = await this.usersService.createUser({
        userData
      });

      const payload = await this.payload(user);

      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH,
      });

      return {
        user: user,
        token: this.jwtService.sign(payload),
      };
    } catch (err) {
      console.log(err);
    }
  }

  async payload(data: any) {
    return {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    };
  }
}
