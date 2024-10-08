import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
  }
}
