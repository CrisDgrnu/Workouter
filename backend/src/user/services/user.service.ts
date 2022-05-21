import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: UserDto): Promise<User> {
    const createdUser = this.userRepository.create(user);
    return this.userRepository.save(createdUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  find(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  update(id: number, userDto: UserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, userDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
