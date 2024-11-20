import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
//@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if(!createUserDto.password)createUserDto.password = 'user';
    return this.userService.create(createUserDto);  
  }
  @Get()
async findAll(@Query('range') range: string, @Res() res: Response) {
  const parsedRange = JSON.parse(range || '[0, 10]');
  const [start, end] = parsedRange;
  const [users, total] = await this.userService.findAll(start, end - start + 1);

  res.set('Content-Range', `users ${start}-${end}/${total}`);
  return res.json(users);
}

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<User> {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
