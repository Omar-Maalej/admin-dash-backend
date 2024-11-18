import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const userEntity = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        salt: salt, 
      });

      return await this.userRepository.save(userEntity);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate')
      ) {
        throw new ConflictException('email already exists');
      }
      throw error;
    }
  }
  
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`le user d'id ${id} n'existe pas`);
    }
    return await user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newUser = await this.userRepository.preload({ id, ...updateUserDto });
    if (newUser) {
      return await this.userRepository.save(newUser);
    } else {
      throw new NotFoundException(`le user d'id ${id} n'existe pas`);
  }
}

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      return await this.userRepository.remove(user);
    }else {
      throw new NotFoundException(`le user d'id ${id} n'existe pas`);
    }
  }
}
