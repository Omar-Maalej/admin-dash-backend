import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {
        expiresIn : 3600
      }}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService]
})
export class AuthModule {}
