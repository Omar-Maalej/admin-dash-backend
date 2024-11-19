import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { UserRoles } from 'src/user/entities/user-roles.enum';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(credentials : UserLoginDto){
    const user = await this.userRepository.findOne({where : {email : credentials.email}});
    if(!user){
      throw new NotFoundException('email or password incorrect');
    }
    if(user.role !== UserRoles.ADMIN){
      throw new NotFoundException('email or password incorrect');
    }
    const passwordValid = await bcrypt.compare(credentials.password, user.password);
    if(!passwordValid){
      throw new NotFoundException('email or password incorrect');
    }
    const payload = {email : user.email, role : user.role};
    return {
      access_token : this.jwtService.sign(payload,{
        secret : process.env.JWT_SECRET,
        expiresIn : '1h'
          }
      )
    }

    return null;
  }
}
