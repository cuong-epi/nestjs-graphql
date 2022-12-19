import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET_KEY
  })],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, JwtService, UsersService]
})
export class AuthModule {}
