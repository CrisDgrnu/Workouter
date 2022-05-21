import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from '../dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../models';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: number): Promise<User> {
    return this.userService.find(id);
  }

  @Put(':id')
  async update(
    @Param() id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param() id: number): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
