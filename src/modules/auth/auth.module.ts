import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersSchema, Users } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import UsersModule from '../user/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';



@Module({
  imports: [
    MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    JwtModule.register({
      secret: 'osdfoa*B7%&&B^F&TC%' || process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' || process.env.JWT_EXPIRY}
    }),
    UsersModule,
    PassportModule

    
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
