import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@SkipThrottle()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) throw new BadRequestException('Invalid ID.');
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) throw new BadRequestException('Invalid ID.');
    return this.userService.remove(+id);
  }
}
